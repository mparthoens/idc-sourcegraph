using Csw.Application.Extensions;
using Csw.Domain.Entities;
using Csw.Infrastructure.Extensions;
using Idc.API.Extensions;
using Idc.API.MiddleWares;

// ===== ENVIRONMENT VARIABLES LOADING =====
// Load environment variables from .env file
// This allows developers to store sensitive configuration locally without committing to source control
if (File.Exists(".env"))
{
    Console.WriteLine("Loading environment variables from .env file");
    foreach (var line in File.ReadAllLines(".env"))
    {
        // Skip empty lines and comments
        if (!string.IsNullOrWhiteSpace(line) && !line.StartsWith("#"))
        {
            // Split the line into key and value parts
            var parts = line.Split('=', 2, StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length == 2)
            {
                // Set the environment variable
                Environment.SetEnvironmentVariable(parts[0].Trim(), parts[1].Trim());

                // Log that we set the variable (without showing the full value for security)
                var valuePreview = parts[1].Trim().Length > 10
                    ? parts[1].Trim().Substring(0, 10) + "..."
                    : parts[1].Trim();
                Console.WriteLine($"Set environment variable: {parts[0].Trim()} = {valuePreview}");
            }
        }
    }
}
else
{
    Console.WriteLine("No .env file found. Using configuration from appsettings.json");
}

// ===== APPLICATION SETUP =====
// Create the web application builder
var builder = WebApplication.CreateBuilder(args);

// ===== SECURE CONFIGURATION HANDLING =====
// Override connection string from environment variable if available
// This ensures sensitive database credentials aren't stored in appsettings.json files
var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");
if (!string.IsNullOrEmpty(connectionString))
{
    // Replace the connection string in the configuration with the one from environment variables
    builder.Configuration["ConnectionStrings:CentralDb"] = connectionString;
    Console.WriteLine("Database connection string loaded from environment variable");
}
else
{
    Console.WriteLine("Using database connection string from appsettings.json");
}

// ===== SERVICE REGISTRATION =====
// Add services to the container using extension methods from different projects
// Presentation layer services (controllers, API endpoints, etc.)
builder.AddPresentation();

// Application layer services (use cases, application logic)
builder.Services.AddApplication();

// Infrastructure layer services (database, external APIs, etc.)
builder.Services.AddInfrastructure(builder.Configuration);

// ===== APPLICATION BUILDING =====
// Build the application
var app = builder.Build();

// Create a service scope
var scope = app.Services.CreateScope();

// ===== MIDDLEWARE PIPELINE CONFIGURATION =====
// Configure the HTTP request pipeline
// Add global error handling middleware
app.UseMiddleware<ErrorHandlingMiddleWare>();

// Development-specific middleware
if (app.Environment.IsDevelopment())
{
    // Enable Swagger UI for API documentation in development
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Redirect HTTP requests to HTTPS
app.UseHttpsRedirection();

// ===== API ENDPOINTS CONFIGURATION =====
// Configure identity endpoints
app.MapGroup("api/identity")
        .WithTags("Identity")
        .MapIdentityApi<AspNetUser>();

// Enable authorization middleware
app.UseAuthorization();

// Map controller endpoints
app.MapControllers();

// ===== APPLICATION STARTUP =====
// Start the application
app.Run();
