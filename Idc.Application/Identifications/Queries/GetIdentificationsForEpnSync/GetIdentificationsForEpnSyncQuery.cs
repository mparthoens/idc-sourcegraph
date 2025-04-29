using Csw.Application.Identifications.Dtos;
using MediatR;

namespace Csw.Application.Identifications.Queries.GetIdentificationsForEpnSync

{
    public class GetIdentificationsForEpnSyncQuery(string maxDate) : IRequest<IEnumerable<IdentificationForEpnDto>>
    {
        public string MaxDate { get; set; } = maxDate;
    }
}
