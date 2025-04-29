using AutoMapper;
using Csw.Domain.Entities;

namespace Csw.Application.Animals.Dtos
{
    public class AnimalsProfile : Profile
    {
        public AnimalsProfile()
        {
            CreateMap<Animal, AnimalForEpnDto>();
        }
    }
}
