namespace Csw.Application.Animals.Dtos
{
    public class AnimalForEpnDto
    {
        public int Id { get; set; }

        public string? Species { get; set; }

        public string? Gender { get; set; }

        public DateOnly? Birthdate { get; set; }

        public bool Lost { get; set; }

        public bool Stolen { get; set; }

        public DateTime? DateInsert { get; set; }

        public DateTime? DateUpdate { get; set; }
    }
}
