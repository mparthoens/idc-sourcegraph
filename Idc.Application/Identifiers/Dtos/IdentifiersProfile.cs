using AutoMapper;
using Csw.Application.Identifiers.Commands.CreateIdentifier;
using Csw.Application.Identifiers.Commands.UpdateIdentifier;
using Csw.Domain.Entities;

namespace Csw.Application.Identifiers.Dtos
{
    public class IdentifiersProfile : Profile
    {
        public IdentifiersProfile()
        {
            CreateMap<Identifier, IdentifierDto>();
            CreateMap<CreateIdentifierCommand, Identifier>();
            CreateMap<UpdateIdentifierCommand, Identifier>();
        }
    }
}
