using Csw.Domain.Entities;

namespace Csw.Domain.Repositories
{
    public interface IIdentifiersRepository
    {
        Task<IEnumerable<Identifier>> GetAllAsync();
        Task<Identifier?> GetByIdAsync(int id);

        Task<int> Create(Identifier identifier);

        Task Delete(Identifier identifier);

        Task SaveChanges();
    }
}
