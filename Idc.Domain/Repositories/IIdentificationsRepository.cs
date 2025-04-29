using Csw.Domain.Entities;

namespace Csw.Domain.Repositories
{
    public interface IIdentificationsRepository
    {
        Task<Identification?> GetByIdAsync(int id);
        Task<IEnumerable<Identification>> GetIdentificationsForEpnSync(string maxDate);
        DateTime? GetIdentificationsEpnDateInsertUpdateMax();

        Task UpdateIdentificationEpnDates(Identification identification);
        Task SaveChanges();

    }
}
