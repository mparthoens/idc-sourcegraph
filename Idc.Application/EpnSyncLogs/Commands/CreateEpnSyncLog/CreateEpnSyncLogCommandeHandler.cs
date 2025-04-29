using AutoMapper;
using Csw.Domain.Entities;
using Csw.Domain.Repositories;
using MediatR;

namespace Csw.Application.EpnSyncLogs.Commands.CreateEpnSyncLog
{
    public class CreateEpnSyncLogCommandeHandler(IMapper mapper, IEpnSyncLogsRepository epnSyncLogsRepository) :
        IRequestHandler<CreateEpnSyncLogCommand, int>
    {
        public async Task<int> Handle(CreateEpnSyncLogCommand request, CancellationToken cancellationToken)
        {
            var epnSyncLog = mapper.Map<EpnSyncLog>(request);
            int id = await epnSyncLogsRepository.Create(epnSyncLog);
            return id;
        }
    }
}
