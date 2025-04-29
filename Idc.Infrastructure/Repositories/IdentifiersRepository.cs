using Csw.Domain.Entities;
using Csw.Domain.Repositories;
using Csw.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Csw.Infrastructure.Repositories
{
    internal class IdentifiersRepository(CentralDbContext dbContext) : IIdentifiersRepository
    {
        public async Task<IEnumerable<Identifier>> GetAllAsync()
        {
            var identifiers = await dbContext.Identifiers.ToListAsync();
            return identifiers;
        }

        public async Task<Identifier?> GetByIdAsync(int id)
        {
            var identifier = await dbContext.Identifiers
              .Include(c => c.Country)
              .FirstOrDefaultAsync(x => x.Id == id);

            return identifier;
        }

        public async Task<int> Create(Identifier identifier)
        {
            dbContext.Identifiers.Add(identifier);
            await dbContext.SaveChangesAsync();
            return identifier.Id;
        }

        public async Task Delete(Identifier identifier)
        {
            dbContext.Remove(identifier);
            await dbContext.SaveChangesAsync();
        }

        public Task SaveChanges() => dbContext.SaveChangesAsync();


    }
}
