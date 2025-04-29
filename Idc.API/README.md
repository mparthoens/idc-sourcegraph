## Configuration Setup

This project uses environment variables for sensitive configuration.

### Local Development Setup

1. Copy the template configuration:
   ```
   cp Idc.API/appsettings.template.json Idc.API/appsettings.json
   cp Idc.API/appsettings.Development.template.json Idc.API/appsettings.Development.json
   cp Idc.API/.env.example Idc.API/.env
   ```

2. Update your .env file with the actual connection string:
   ```
   CENTRAL_DB_CONNECTION_STRING=your_actual_connection_string
   ```
