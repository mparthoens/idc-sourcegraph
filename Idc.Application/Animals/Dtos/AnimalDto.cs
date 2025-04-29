namespace Csw.Application.Animals.Dtos
{
    public class AnimalDto
    {
        public int Id { get; }

        public int? OwnerId { get; set; }

        public int? AssociationId { get; set; }

        public string? Species { get; set; }

        public int LastOrganisationId { get; set; }

        public int? LastUserId { get; set; }

        public string? Name { get; set; }

        public string? Gender { get; set; }

        public DateOnly? Birthdate { get; set; }

        public bool Pending { get; set; }

        public bool Deceased { get; set; }

        public bool Breeding { get; set; }

        public bool Sterilized { get; set; }

        public bool Lost { get; set; }

        public bool Stolen { get; set; }

        public bool Exported { get; set; }

        public bool Unknown { get; set; }

        public bool Temporary { get; set; }

        public bool ToPrint { get; set; }

        public DateTime DateInsert { get; set; }

        public DateTime? DateUpdate { get; set; }

        public bool? BatchPrint { get; set; }

        public bool Validated { get; set; }

        public string? DistinguishingMarks { get; set; }
    }
}
