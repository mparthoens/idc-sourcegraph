using Microsoft.Extensions.Configuration;
using System;

namespace Idc.API.Extensions
{
	/// <summary>
	/// Extension methods for IConfiguration to enhance security and environment variable support
	/// </summary>
	public static class ConfigurationExtensions
	{
		/// <summary>
		/// Gets a connection string securely, prioritizing environment variables over configuration files
		/// </summary>
		/// <param name="configuration">The configuration instance</param>
		/// <param name="name">The connection string name</param>
		/// <returns>The connection string value</returns>
		public static string GetConnectionStringSecure(this IConfiguration configuration, string name)
		{
			if (configuration == null)
			{
				throw new ArgumentNullException(nameof(configuration));
			}

			// First try environment variable with standard naming convention
			var envVarName = $"ConnectionStrings__{name}".Replace(":", "__");
			var connectionString = Environment.GetEnvironmentVariable(envVarName);

			// Then try direct environment variable
			if (string.IsNullOrEmpty(connectionString))
			{
				connectionString = Environment.GetEnvironmentVariable($"DATABASE_CONNECTION_STRING_{name.ToUpper()}");
			}

			// Finally fall back to configuration
			if (string.IsNullOrEmpty(connectionString))
			{
				connectionString = configuration.GetConnectionString(name);
			}

			return connectionString;
		}
	}
}
