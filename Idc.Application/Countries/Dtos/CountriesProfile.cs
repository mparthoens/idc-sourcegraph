using AutoMapper;
using Csw.Domain.Entities;

namespace Csw.Application.Countries.Dtos
{
    public class CountriesProfile : Profile
    {
        public CountriesProfile()
        {
            CreateMap<Country, CountryDto>();
        }
    }
}

