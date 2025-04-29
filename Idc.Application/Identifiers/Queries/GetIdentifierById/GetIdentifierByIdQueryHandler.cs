using AutoMapper;
using Csw.Application.Identifiers.Dtos;
using Csw.Domain.Entities;
using Csw.Domain.Exceptions;
using Csw.Domain.Repositories;
using MediatR;

namespace Csw.Application.Identifiers.Queries.GetIdentifierById
{
    public class GetIdentifierByIdQueryHandler(IMapper mapper, IIdentifiersRepository identifiersRepository) :
    IRequestHandler<GetIdentifierByIdQuery, IdentifierDto>
    {
        public async Task<IdentifierDto> Handle(GetIdentifierByIdQuery request, CancellationToken cancellationToken)
        {
            var identifier = await identifiersRepository.GetByIdAsync(request.Id);

            if (identifier == null)
            {
                throw new NotFoundException(nameof(Identifier), request.Id.ToString());
            }

            var identifierDto = mapper.Map<IdentifierDto>(identifier);

            return identifierDto;
        }
    }
}
