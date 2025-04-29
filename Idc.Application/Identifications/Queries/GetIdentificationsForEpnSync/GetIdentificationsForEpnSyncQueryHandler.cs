using AutoMapper;
using Csw.Application.Identifications.Dtos;
using Csw.Domain.Repositories;
using MediatR;

namespace Csw.Application.Identifications.Queries.GetIdentificationsForEpnSync
{
    public class GetIdentificationsForEpnSyncQueryHandler(IMapper mapper, IIdentificationsRepository identificationsRepository) :
        IRequestHandler<GetIdentificationsForEpnSyncQuery, IEnumerable<IdentificationForEpnDto>>
    {
        public async Task<IEnumerable<IdentificationForEpnDto>> Handle(GetIdentificationsForEpnSyncQuery request, CancellationToken cancellationToken)
        {
            var identifications = await identificationsRepository.GetIdentificationsForEpnSync(request.MaxDate);
            var identificationsDto = mapper.Map<IEnumerable<IdentificationForEpnDto>>(identifications);

            return identificationsDto;

        }
    }
}
