using Csw.Application.Animals.Dtos;

namespace Csw.Application.Identifications.Dtos
{
    public class IdentificationForEpnDto
    {
        public int Id { get; set; }
        public int AnimalId { get; set; }
        public string IdentificationNumber { get; set; } = null!;
        public DateOnly? DateIdentification { get; set; }
        public DateTime? DateInsert { get; set; }
        public DateTime? DateUpdate { get; set; }
        public DateTime? EpnDateInsert { get; set; }
        public DateTime? EpnDateUpdate { get; set; }

        public AnimalForEpnDto Animal { get; set; } = null!;
    }
}
