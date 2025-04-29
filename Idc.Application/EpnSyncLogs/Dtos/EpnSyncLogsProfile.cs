using AutoMapper;
using Csw.Application.EpnSyncLogs.Commands.CreateEpnSyncLog;
using Csw.Application.Identifiers.Dtos;
using Csw.Domain.Entities;

namespace Csw.Application.EpnSyncLogs.Dtos
{
    public class EpnSyncLogsProfile : Profile
    {
        public EpnSyncLogsProfile()
        {
            CreateMap<Identifier, IdentifierDto>();
            CreateMap<CreateEpnSyncLogCommand, EpnSyncLog>();
        }
    }
}
