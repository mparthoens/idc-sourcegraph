﻿using Microsoft.Extensions.Configuration;
using System;
using Idc.API.MiddleWares;
using Microsoft.OpenApi.Models;

namespace Idc.API.Extensions
{
	public static class WebApplicationBuilderExtensions
	{
		public static void AddPresentation(this WebApplicationBuilder builder)
		{
			builder.Services.AddAuthentication();
			builder.Services.AddControllers();
			builder.Services.AddSwaggerGen(c =>
			{
				c.AddSecurityDefinition("bearerAuth", new OpenApiSecurityScheme
				{
					Type = SecuritySchemeType.Http,
					Scheme = "Bearer"
				});
				c.AddSecurityRequirement(new OpenApiSecurityRequirement
					{
										{
												new OpenApiSecurityScheme
												{
														Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "bearerAuth"}
												},
												Array.Empty<string>()
										}
					});
			});
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddScoped<ErrorHandlingMiddleWare>();
		}
	}
}
