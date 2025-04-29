
using Csw.Application.Extensions;
using Csw.Domain.Entities;
using Csw.Infrastructure.Extensions;
using Idc.API.Extensions;
using Idc.API.MiddleWares;

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
