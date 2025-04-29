using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;

internal class Program
{
	// Constants for API configuration and credentials
	private const string MEMBER_CODE = "IDC";                                   // Organization code for EPN
	private const string IDENTIFICATION_TYPE = "M";                             // Type of identification (M = Microchip)
	private const string TRANSACTION_TYPE_NEW = "N";                            // Transaction type for new records
	private const string TRANSACTION_TYPE_UPDATE = "U";                         // Transaction type for updating records
	private const string IDC_API_BASE_URL = "https://localhost:7125";           // Base URL for IDC API
	private const string EPN_API_BASE_URL = "https://search-api.europetnet.org/"; // Base URL for EPN API
	private const string EPN_USERNAME = "F4399575-FBFC-4EC1-9ED0-8FB2C463150F"; // EPN API username
	private const string EPN_PASSWORD = "5HU#r@8g5";                            // EPN API password
	private const string IDC_EMAIL = "admin@admin.com";                         // IDC API email
	private const string IDC_PASSWORD = "Password1!";                           // IDC API password

	/// <summary>
	/// Main entry point for the application. Orchestrates the synchronization process.
	/// </summary>
	private static async Task Main()
	{
		// Step 1: Get IDC authentication token
		string? idcToken = await GetIdcToken();
		if (idcToken == null)
		{
			Console.WriteLine("Failed to get IDC token");
			return;
		}

		// Step 2: Get the maximum date from previous synchronizations
		string? idcMaxDate = await GetIdcMaxDate();
		if (idcMaxDate == null)
		{
			Console.WriteLine("Failed to get max date");
			return;
		}

		// Step 3: Get identifications that need to be synchronized with EPN
		List<IdentificationAnimal>? identifications = await GetIdcIdentificationsToSendToEpn(idcToken, idcMaxDate);
		if (identifications == null || identifications.Count == 0)
		{
			Console.WriteLine("No identifications to process");
			return;
		}

		// Step 4: Get EPN authentication token
		string? epnToken = await GetEpnToken();
		if (epnToken == null)
		{
			Console.WriteLine("Failed to get EPN token");
			return;
		}

		// Create HTTP clients for API communication
		using HttpClient epnClient = new();
		using HttpClient idcClient = new();

		// Track when the token was obtained to refresh it if needed
		DateTime tokenRefreshTime = DateTime.UtcNow;
		int successCount = 0;

		// Step 5: Process each identification
		foreach (var identification in identifications)
		{
			// Refresh EPN token if it's older than ~16 minutes (1000 seconds)
			if ((DateTime.UtcNow - tokenRefreshTime).TotalSeconds > 1000)
			{
				epnToken = await GetEpnToken();
				if (epnToken == null)
				{
					Console.WriteLine("Failed to refresh EPN token");
					continue;
				}
				tokenRefreshTime = DateTime.UtcNow;
			}

			// Determine if this is a new record or an update
			var dateUpdate = DateTime.UtcNow;
			string transactionType;

			if (identification.epnDateInsert == null)
			{
				// New record - never sent to EPN before
				transactionType = TRANSACTION_TYPE_NEW;
				identification.epnDateInsert = dateUpdate;
				identification.epnDateUpdate = dateUpdate;
			}
			else
			{
				// Update record - previously sent to EPN
				transactionType = TRANSACTION_TYPE_UPDATE;
				identification.epnDateUpdate = dateUpdate;
			}

			// Skip records with missing identification numbers
			if (identification.identificationNumber == null)
			{
				Console.WriteLine($"Skipping identification {identification.id} - null identification number");
				continue;
			}

			// Prepare data for EPN
			var chipList = BuildChipList(identification, transactionType);
			var epnSyncLog = CreateEpnSyncLogFromChipList(chipList, identification);

			// Send data to EPN
			var (success, errorMessage) = await SendToEpn(epnClient, chipList, epnToken);

			// If first attempt fails, try with the opposite transaction type
			// (Sometimes EPN requires 'N' when we think it should be 'U' or vice versa)
			if (!success)
			{
				Console.WriteLine($"First attempt failed for {identification.identificationNumber}, trying opposite transaction type");
				string oppositeTransactionType = transactionType == TRANSACTION_TYPE_NEW ?
																				TRANSACTION_TYPE_UPDATE : TRANSACTION_TYPE_NEW;

				chipList.TransactionType = oppositeTransactionType;
				(success, errorMessage) = await SendToEpn(epnClient, chipList, epnToken);
			}

			// Update the log with the result
			epnSyncLog.IsSuccess = success;
			epnSyncLog.ErrorCodeList = success ? "" : errorMessage ?? "Unknown error";
			epnSyncLog.ProcessingDate = DateTime.UtcNow;

			// Log the synchronization attempt
			bool logResult = await LogToEpnSyncLog(epnSyncLog, idcToken);
			if (!logResult)
			{
				Console.WriteLine($"Failed to log sync result for {identification.identificationNumber}");
			}

			if (success)
			{
				successCount++;
			}
		}

		// Step 6: Update all processed identifications in IDC database
		int updateCount = 0;
		foreach (var identification in identifications)
		{
			bool updateResult = await UpdateIdcRecord(idcClient, identification, idcToken);
			if (updateResult)
			{
				updateCount++;
			}
		}

		// Output summary statistics
		Console.WriteLine($"Processed {identifications.Count} identifications");
		Console.WriteLine($"Successfully synced with EPN: {successCount}");
		Console.WriteLine($"Successfully updated in IDC: {updateCount}");
	}

	/// <summary>
	/// Gets an authentication token from the IDC API.
	/// </summary>
	/// <returns>The authentication token or null if unsuccessful.</returns>
	private static async Task<string?> GetIdcToken()
	{
		try
		{
			using HttpClient client = new();
			var userForLoginIdc = new UserIdc
			{
				Email = IDC_EMAIL,
				Password = IDC_PASSWORD
			};

			StringContent bodyIdc = new(JsonSerializer.Serialize(userForLoginIdc));
			bodyIdc.Headers.ContentType = new MediaTypeHeaderValue("application/json");

			var resultIdc = await client.PostAsync($"{IDC_API_BASE_URL}/api/identity/login", bodyIdc);
			resultIdc.EnsureSuccessStatusCode();

			var responseIdc = await resultIdc.Content.ReadAsStringAsync();
			var tokenIdc = JsonSerializer.Deserialize<TokenResponse>(responseIdc);

			return tokenIdc?.accessToken;
		}
		catch (Exception ex)
		{
			Console.WriteLine($"Error getting IDC token: {ex.Message}");
			return null;
		}
	}

	/// <summary>
	/// Gets identifications that need to be synchronized with EPN.
	/// </summary>
	/// <param name="idcToken">The IDC authentication token.</param>
	/// <param name="idcMaxDate">The maximum date from previous synchronizations.</param>
	/// <returns>A list of identifications or null if unsuccessful.</returns>
	private static async Task<List<IdentificationAnimal>?> GetIdcIdentificationsToSendToEpn(string idcToken, string idcMaxDate)
	{
		try
		{
			using HttpClient client = new();
			client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", idcToken);

			var resultIdc = await client.GetAsync($"{IDC_API_BASE_URL}/api/identifications/getidentificationsforepnsync/{idcMaxDate}");
			resultIdc.EnsureSuccessStatusCode();

			var responseIdc = await resultIdc.Content.ReadAsStringAsync();
			var identificationAnimals = JsonSerializer.Deserialize<List<IdentificationAnimal>>(responseIdc);

			return identificationAnimals;
		}
		catch (Exception ex)
		{
			Console.WriteLine($"Error getting identifications: {ex.Message}");
			return null;
		}
	}

	/// <summary>
	/// Gets an authentication token from the EPN API.
	/// </summary>
	/// <returns>The authentication token or null if unsuccessful.</returns>
	private static async Task<string?> GetEpnToken()
	{
		try
		{
			using HttpClient client = new();
			var userForLogin = new UserEpn
			{
				username = EPN_USERNAME,
				password = EPN_PASSWORD
			};

			StringContent bodyLoginEpn = new(JsonSerializer.Serialize(userForLogin));
			bodyLoginEpn.Headers.ContentType = new MediaTypeHeaderValue("application/json");

			var resultLoginEpn = await client.PostAsync($"{EPN_API_BASE_URL}/api/ChipMaster/AuthenticateMember", bodyLoginEpn);
			resultLoginEpn.EnsureSuccessStatusCode();

			var responseLoginEpn = await resultLoginEpn.Content.ReadAsStringAsync();
			var jsonNodeResponseEpn = JsonNode.Parse(responseLoginEpn);
			var tokenEpn = jsonNodeResponseEpn["Data"]["token"]?.ToString();

			return tokenEpn;
		}
		catch (Exception ex)
		{
			Console.WriteLine($"Error getting EPN token: {ex.Message}");
			return null;
		}
	}

	/// <summary>
	/// Inserts a record in the EPN sync log.
	/// </summary>
	/// <param name="epnSyncLog">The EPN sync log record.</param>
	/// <param name="IdcToken">The IDC authentication token.</param>
	/// <returns>0 if successful, 1 if unsuccessful.</returns>
	private static async Task<int> InsertRecordInEpnSyncLog(EpnSyncLog epnSyncLog, string IdcToken)
	{
		using (HttpClient client = new())
		{
			client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", IdcToken);
			var jsonStringEpnSyncLog = JsonSerializer.Serialize(epnSyncLog);
			HttpContent content = new StringContent(jsonStringEpnSyncLog.ToString(), Encoding.UTF8, "application/json");
			var resultIdc = await client.PostAsync("https://localhost:7125/api/epnsynclog/", content);
			resultIdc.EnsureSuccessStatusCode();
			return resultIdc.IsSuccessStatusCode ? 0 : 1;
		}
	}

	/// <summary>
	/// Maps a species name to its corresponding EPN code.
	/// </summary>
	/// <param name="species">The species name.</param>
	/// <returns>The EPN species code or empty string if not found.</returns>
	private static string MapSpecies(string? species)
	{
		if (string.IsNullOrEmpty(species)) return string.Empty;

		return species.ToUpper() switch
		{
			"BIRD" or "OISEAU" or "VOGEL" => "BI",
			"CAT" or "CHAT" or "KAT" or "KATZE" => "CA",
			"DOG" or "CHIEN" or "HOND" or "HUND" => "DO",
			"FISH" or "POISSON" or "VIS" or "FISCH" => "FI",
			"FERRET" or "FURET" or "FRET" or "FRETTCHEN" => "FR",
			"HORSE" or "CHEVAL" or "PAARD" or "PFERD" => "HO",
			"RABBIT" or "LAPIN" or "KONIJN" or "KANINCHEN" => "RA",
			"REPTILE" or "REPTIEL" or "REPTIL" => "RE",
			"SNAKE" or "SERPENT" or "SLANG" or "SCHLANGE" => "SN",
			"TURTLE" or "TORTUE" or "SCHILDPAD" or "SCHILDKRÖTE" => "TU",
			_ => string.Empty
		};
	}

	/// <summary>
	/// Gets the chipped date as a string in the format required by EPN.
	/// </summary>
	/// <param name="identification">The identification animal record.</param>
	/// <returns>The chipped date as a string in yyyy-MM-dd format.</returns>
	private static string GetChippedDateString(IdentificationAnimal identification)
	{
		// Use the first non-null date in this order: dateIdentification, dateUpdate, dateInsert, current time
		DateTime? chippedDate = identification.dateIdentification ??
													 identification.dateUpdate ??
													 identification.dateInsert ??
													 DateTime.UtcNow;

		return chippedDate?.ToString("yyyy-MM-dd") ?? DateTime.UtcNow.ToString("yyyy-MM-dd");
	}

	/// <summary>
	/// Builds a ChipList object from an IdentificationAnimal.
	/// </summary>
	/// <param name="identification">The identification animal record.</param>
	/// <param name="transactionType">The transaction type (N for new, U for update).</param>
	/// <returns>A ChipList object ready to be sent to EPN.</returns>
	private static ChipList BuildChipList(IdentificationAnimal identification, string transactionType)
	{
		return new ChipList
		{
			TransactionType = transactionType,
			MemberCode = MEMBER_CODE,
			IdentificationType = IDENTIFICATION_TYPE,
			IdentificationNumber = identification.identificationNumber,
			ChippedDate = GetChippedDateString(identification),
			Gender = identification.animal?.gender,
			BirthDate = identification.animal?.birthdate,
			Species = MapSpecies(identification.animal?.species),
			IsMissing = identification.animal?.stolen == true || identification.animal?.lost == true,
			MissingDate = (identification.animal?.stolen == true || identification.animal?.lost == true) ?
											identification.animal?.dateUpdate : null
		};
	}

	/// <summary>
	/// Sends data to the EPN API.
	/// </summary>
	/// <param name="client">The HTTP client to use.</param>
	/// <param name="chipList">The ChipList to send.</param>
	/// <param name="epnToken">The EPN authentication token.</param>
	/// <returns>A tuple containing success status and error message if any.</returns>
	private static async Task<(bool Success, string? ErrorMessage)> SendToEpn(
			HttpClient client,
			ChipList chipList,
			string epnToken)
	{
		try
		{
			// Wrap the ChipList in a ChipListArray as required by the EPN API
			var chipListArray = new ChipListArray
			{
				ChipList = new List<ChipList> { chipList }
			};

			// Serialize the data and prepare the request
			var jsonString = JsonSerializer.Serialize(chipListArray);
			StringContent bodyPostEpn = new(jsonString);
			bodyPostEpn.Headers.ContentType = new MediaTypeHeaderValue("application/json");

			// Set the authorization header and send the request
			client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", epnToken);
			var resultPostEpn = await client.PostAsync($"{EPN_API_BASE_URL}/api/ChipMaster/ModifyChipIds", bodyPostEpn);
			resultPostEpn.EnsureSuccessStatusCode();

			// Process the response
			var responsePostEpn = await resultPostEpn.Content.ReadAsStringAsync();
			var jsonNodeResponsePostEpn = JsonNode.Parse(responsePostEpn);
			var postEpnStatus = jsonNodeResponsePostEpn["Status"]?.ToString();

			// Check if the operation was successful
			if (postEpnStatus == "true")
			{
				return (true, null);
			}
			else
			{
				// Extract error information if available
				var errorCodeList = jsonNodeResponsePostEpn["Data"]?[0]?["ErrorCodeList"]?.ToString();
				return (false, errorCodeList);
			}
		}
		catch (Exception ex)
		{
			Console.WriteLine($"Error sending data to EPN: {ex.Message}");
			return (false, ex.Message);
		}
	}

	/// <summary>
	/// Updates an identification record in the IDC database.
	/// </summary>
	/// <param name="client">The HTTP client to use.</param>
	/// <param name="identification">The identification to update.</param>
	/// <param name="idcToken">The IDC authentication token.</param>
	/// <returns>True if successful, false otherwise.</returns>
	private static async Task<bool> UpdateIdcRecord(
			HttpClient client,
			IdentificationAnimal identification,
			string idcToken)
	{
		try
		{
			// Set the authorization header
			client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", idcToken);

			// Create a minimal object with just the fields we want to update
			var animal = new IdentificationAnimal
			{
				epnDateInsert = identification.epnDateInsert,
				epnDateUpdate = identification.epnDateUpdate
			};

			// Serialize and send the request
			var jsonStringAnimal = JsonSerializer.Serialize(animal);
			HttpContent content = new StringContent(jsonStringAnimal, Encoding.UTF8, "application/json");

			var resultIdc = await client.PatchAsync($"{IDC_API_BASE_URL}/api/identifications/{identification.id}", content);
			resultIdc.EnsureSuccessStatusCode();

			return true;
		}
		catch (Exception ex)
		{
			Console.WriteLine($"Error updating IDC record: {ex.Message}");
			return false;
		}
	}

	/// <summary>
	/// Logs a synchronization attempt to the EPN sync log.
	/// </summary>
	/// <param name="epnSyncLog">The EPN sync log record.</param>
	/// <param name="idcToken">The IDC authentication token.</param>
	/// <returns>True if successful, false otherwise.</returns>
	private static async Task<bool> LogToEpnSyncLog(
			EpnSyncLog epnSyncLog,
			string idcToken)
	{
		try
		{
			using HttpClient client = new();
			client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", idcToken);

			// Serialize and send the request
			var jsonStringEpnSyncLog = JsonSerializer.Serialize(epnSyncLog);
			HttpContent content = new StringContent(jsonStringEpnSyncLog, Encoding.UTF8, "application/json");

			var resultIdc = await client.PostAsync($"{IDC_API_BASE_URL}/api/epnsynclog/", content);
			resultIdc.EnsureSuccessStatusCode();

			return true;
		}
		catch (Exception ex)
		{
			Console.WriteLine($"Error logging to EPN sync log: {ex.Message}");
			return false;
		}
	}

	/// <summary>
	/// Gets the maximum date from previous synchronizations.
	/// </summary>
	/// <returns>The maximum date as a string or null if unsuccessful.</returns>
	private static async Task<string?> GetIdcMaxDate()
	{
		try
		{
			using HttpClient client = new();
			var maxDateResult = await client.GetAsync($"{IDC_API_BASE_URL}/api/identifications/getidentificationsepndateinsertupdatemax");
			maxDateResult.EnsureSuccessStatusCode();

			// Parse and return the date
			string maxDate = (await maxDateResult.Content.ReadAsStringAsync()).Trim('"');
			return maxDate;
		}
		catch (Exception ex)
		{
			Console.WriteLine($"Error getting max date: {ex.Message}");
			return null;
		}
	}

	/// <summary>
	/// Creates an EPN sync log record from a ChipList and IdentificationAnimal.
	/// </summary>
	/// <param name="chipList">The ChipList object.</param>
	/// <param name="identification">The identification animal record.</param>
	/// <returns>An EPN sync log record.</returns>
	private static EpnSyncLog CreateEpnSyncLogFromChipList(ChipList chipList, IdentificationAnimal identification)
	{
		return new EpnSyncLog
		{
			TransactionType = chipList.TransactionType,
			MemberCode = chipList.MemberCode,
			IdentificationType = chipList.IdentificationType,
			IdentificationNumber = chipList.IdentificationNumber,
			ChippedDate = identification.dateIdentification ?? identification.dateUpdate ?? identification.dateInsert,
			Gender = chipList.Gender,
			BirthDate = chipList.BirthDate,
			Species = chipList.Species,
			IsMissing = chipList.IsMissing,
			MissingDate = chipList.MissingDate,
			ProcessingDate = DateTime.UtcNow,
			IsSuccess = false,  // Will be updated after the EPN call
			ErrorCodeList = ""  // Will be updated after the EPN call
		};
	}

	// Model classes for API communication

	/// <summary>
	/// Represents a token response from the IDC API.
	/// </summary>
	public class TokenResponse
	{
		public string accessToken { get; set; } = string.Empty;
	}

	/// <summary>
	/// Represents a user for IDC API authentication.
	/// </summary>
	public class UserIdc
	{
		public string Email { get; set; } = string.Empty;
		public string Password { get; set; } = string.Empty;
	}

	/// <summary>
	/// Represents a user for EPN API authentication.
	/// </summary>
	public class UserEpn
	{
		public string username { get; set; } = string.Empty;
		public string password { get; set; } = string.Empty;
	}

	/// <summary>
	/// Represents an animal identification record.
	/// </summary>
	public class IdentificationAnimal
	{
		public int id { get; set; }
		public string? identificationNumber { get; set; }
		public DateTime? dateIdentification { get; set; }
		public DateTime? dateInsert { get; set; }
		public DateTime? dateUpdate { get; set; }
		public DateTime? epnDateInsert { get; set; }
		public DateTime? epnDateUpdate { get; set; }
		public Animal? animal { get; set; }
	}

	/// <summary>
	/// Represents an animal record.
	/// </summary>
	public class Animal
	{
		public int id { get; set; }
		public string? species { get; set; }
		public string? gender { get; set; }
		public DateTime? birthdate { get; set; }
		public bool lost { get; set; }
		public bool stolen { get; set; }
		public DateTime? dateInsert { get; set; }
		public DateTime? dateUpdate { get; set; }
	}

	/// <summary>
	/// Represents a record in the EPN synchronization log.
	/// </summary>
	public class EpnSyncLog
	{
		public int Id { get; set; }
		public string? TransactionType { get; set; } = "";
		public string? MemberCode { get; set; } = "";
		public string? IdentificationType { get; set; } = "";
		public string? IdentificationNumber { get; set; } = "";
		public DateTime? ChippedDate { get; set; }
		public string? Gender { get; set; } = "";
		public DateTime? BirthDate { get; set; }
		public string? Species { get; set; } = "";
		public bool? IsMissing { get; set; }
		public DateTime? MissingDate { get; set; }
		public DateTime? ProcessingDate { get; set; }
		public bool? IsSuccess { get; set; }
		public string? ErrorCodeList { get; set; } = "";
	}

	/// <summary>
	/// Represents a chip list record for the EPN API.
	/// </summary>
	public class ChipList
	{
		public string? TransactionType { get; set; }
		public string? MemberCode { get; set; }
		public string? IdentificationType { get; set; }
		public string? IdentificationNumber { get; set; }
		public string? ChippedDate { get; set; }
		public string? Gender { get; set; }
		public DateTime? BirthDate { get; set; }
		public string? Species { get; set; }
		public bool IsMissing { get; set; }
		public DateTime? MissingDate { get; set; }
	}

	/// <summary>
	/// Represents an array of chip lists for the EPN API.
	/// </summary>
	public class ChipListArray
	{
		public List<ChipList>? ChipList { get; set; }
	}
}
