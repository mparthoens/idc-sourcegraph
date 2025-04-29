using Csw.Domain.Entities;

namespace Csw.Domain.Repositories
{
    public interface IEpnSyncLogsRepository
    {
        Task<EpnSyncLog?> GetByIdAsync(int id);
        Task<int> Create(EpnSyncLog epnSyncLog);
        Task SaveChanges();
    }
}
