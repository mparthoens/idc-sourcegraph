using Csw.Application.Animals.Dtos;

namespace Csw.Application.Identifications.Dtos
{
    public class IdentificationDto
    {
        public int Id { get; set; }

        public int IdentificationTypeId { get; set; }

        public int IdentificationLocalisationId { get; set; }

        public int AnimalId { get; set; }

        public int IdentifierId { get; set; }

        public int? LastUserId { get; set; }

        public string IdentificationNumber { get; set; } = null!;

        public string Comment { get; set; } = null!;

        public DateOnly? DateIdentification { get; set; }

        public DateTime DateInsert { get; set; }

        public DateTime? DateUpdate { get; set; }

        public bool Validated { get; set; }

        public int? AppUserId { get; set; }

        public DateTime? EpnDateInsert { get; set; }
        public DateTime? EpnDateUpdate { get; set; }

        public AnimalDto Animal { get; set; } = null!;
    }
}
