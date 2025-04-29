using Csw.Domain.Entities;
using Csw.Domain.Repositories;
using Csw.Infrastructure.Persistence;
using Csw.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Csw.Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("CentralDb");
            services.AddDbContext<CentralDbContext>(options => options.UseSqlServer(connectionString));

            services.AddIdentityApiEndpoints<AspNetUser>()
                .AddEntityFrameworkStores<CentralDbContext>();

            services.AddScoped<IIdentifiersRepository, IdentifiersRepository>();
            services.AddScoped<IIdentificationsRepository, IdentificationsRepository>();
            services.AddScoped<IEpnSyncLogsRepository, EpnSyncLogRepository>();

        }
    }
}