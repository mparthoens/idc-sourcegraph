using Csw.Application.EpnSyncLogs.Dtos;
using MediatR;

namespace Csw.Application.EpnSyncLogs.Queries.GetEpnSyncLogById
{
    public class GetEpnSyncLogByIdQuery(int id) : IRequest<EpnSyncLogDto>
    {
        public int Id { get; set; } = id;
    }
}
