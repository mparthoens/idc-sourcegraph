using AutoMapper;
using Csw.Application.Identifications.Commands.UpdateIdentification;
using Csw.Domain.Entities;

namespace Csw.Application.Identifications.Dtos
{
    public class IdentificationsProfile : Profile
    {
        public IdentificationsProfile()
        {
            CreateMap<Identification, IdentificationDto>();
            CreateMap<Identification, IdentificationForEpnDto>();
            CreateMap<UpdateIdentificationEpnDatesCommand, Identification>();
        }
    }
}
