using AutoMapper;
using Csw.Application.Identifiers.Dtos;
using Csw.Domain.Repositories;
using MediatR;

namespace Csw.Application.Identifiers.Queries.GetAllIdentifiers
{
    public class GetAllIdentifiersQueryHandler(IMapper mapper, IIdentifiersRepository identifiersRepository) :
    IRequestHandler<GetAllIdentifiersQuery, IEnumerable<IdentifierDto>>
    {
        public async Task<IEnumerable<IdentifierDto>> Handle(GetAllIdentifiersQuery request, CancellationToken cancellationToken)
        {
            var identifiers = await identifiersRepository.GetAllAsync();
            var identifiersDto = mapper.Map<IEnumerable<IdentifierDto>>(identifiers);

            return identifiersDto!;
        }
    }
}
