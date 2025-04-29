using Csw.Domain.Entities;
using Csw.Domain.Repositories;
using Csw.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Csw.Infrastructure.Repositories
{
    internal class EpnSyncLogRepository(CentralDbContext dbContext) : IEpnSyncLogsRepository
    {
        public async Task<EpnSyncLog?> GetByIdAsync(int id)
        {
            var epnSyncLog = await dbContext.EpnSyncLogs
              .FirstOrDefaultAsync(x => x.Id == id);

            return epnSyncLog;
        }
        public async Task<int> Create(EpnSyncLog epnSyncLog)
        {
            dbContext.EpnSyncLogs.Add(epnSyncLog);
            await dbContext.SaveChangesAsync();
            return epnSyncLog.Id;
        }

        public Task SaveChanges() => dbContext.SaveChangesAsync();
    }
}
