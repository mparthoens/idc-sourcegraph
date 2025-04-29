using Csw.Domain.Entities;
using Csw.Domain.Repositories;
using Csw.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;


namespace Csw.Infrastructure.Repositories
{
    internal class IdentificationsRepository(CentralDbContext dbContext) : IIdentificationsRepository
    {
        public async Task<Identification?> GetByIdAsync(int id)
        {
            var identification = await dbContext.Identifications
              .Include(a => a.Animal)
              .FirstOrDefaultAsync(x => x.Id == id);

            return identification;
        }

        public async Task<IEnumerable<Identification>> GetIdentificationsForEpnSync(string maxDate)
        {
            DateTime parsedMaxDate = DateTime.Parse(maxDate);

            var identifications = await dbContext.Identifications
                .Include(a => a.Animal)
                .Where(d => d.EpnDateInsert == null ||
                            d.EpnDateUpdate == null ||
                            d.DateUpdate > parsedMaxDate ||
                            d.Animal.DateUpdate > parsedMaxDate)
                .OrderBy(d => d.Animal.DateUpdate)
                .ToListAsync();

            return identifications;
        }

        public DateTime? GetIdentificationsEpnDateInsertUpdateMax()
        {

            var maxValueInsert = dbContext.Identifications.Max(i => i.EpnDateInsert);
            if (maxValueInsert == null)
                return null;

            var maxValueUpdate = dbContext.Identifications.Max(i => i.EpnDateUpdate);
            if (maxValueUpdate == null)
                return null;

            if (maxValueInsert > maxValueUpdate)
                maxValueUpdate = maxValueInsert;



            return (DateTime)maxValueUpdate;
        }

        public async Task UpdateIdentificationEpnDates(Identification identification)
        {
            dbContext.Identifications.Update(identification);
            await dbContext.SaveChangesAsync();
        }

        public Task SaveChanges() => dbContext.SaveChangesAsync();


    }
}
