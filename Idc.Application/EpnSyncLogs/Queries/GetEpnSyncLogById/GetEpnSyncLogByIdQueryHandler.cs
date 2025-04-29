using AutoMapper;
using Csw.Application.EpnSyncLogs.Dtos;
using Csw.Domain.Entities;
using Csw.Domain.Exceptions;
using Csw.Domain.Repositories;
using MediatR;

namespace Csw.Application.EpnSyncLogs.Queries.GetEpnSyncLogById
{
    public class GetEpnSyncLogByIdQueryHandler(IMapper mapper, IEpnSyncLogsRepository epnSyncLogsRepository) :
        IRequestHandler<GetEpnSyncLogByIdQuery, EpnSyncLogDto>
    {
        public async Task<EpnSyncLogDto> Handle(GetEpnSyncLogByIdQuery request, CancellationToken cancellationToken)
        {
            var epnSyncLog = await epnSyncLogsRepository.GetByIdAsync(request.Id);

            if (epnSyncLog == null)
            {
                throw new NotFoundException(nameof(EpnSyncLog), request.Id.ToString());
            }

            var epnSyncLogDto = mapper.Map<EpnSyncLogDto>(epnSyncLog);
            return epnSyncLogDto;
        }
    }
}
