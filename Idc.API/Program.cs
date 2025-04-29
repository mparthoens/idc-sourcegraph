
using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Csw.Application.Extensions;
using Csw.Domain.Entities;
using Csw.Infrastructure.Extensions;
using Idc.API.Extensions;
using Idc.API.MiddleWares;

// Load environment variables from .env file
if (File.Exists(".env"))
{
	foreach (var line in File.ReadAllLines(".env"))
	{
		if (!string.IsNullOrWhiteSpace(line) && !line.StartsWith("#"))
		{
			var parts = line.Split('=', 2, StringSplitOptions.RemoveEmptyEntries);
			if (parts.Length == 2)
			{
				Environment.SetEnvironmentVariable(parts[0], parts[1]);
			}
		}
	}
}

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.AddPresentation();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

var scope = app.Services.CreateScope();

// Configure the HTTP request pipeline.

app.UseMiddleware<ErrorHandlingMiddleWare>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGroup("api/identity")
    .WithTags("Identity")
    .MapIdentityApi<AspNetUser>();

app.UseAuthorization();

app.MapControllers();

app.Run();
