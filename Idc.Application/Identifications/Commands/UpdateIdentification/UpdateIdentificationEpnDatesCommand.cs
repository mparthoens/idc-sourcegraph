using MediatR;

namespace Csw.Application.Identifications.Commands.UpdateIdentification
{
    public class UpdateIdentificationEpnDatesCommand : IRequest
    {
        public int Id { get; set; }
        public DateTime? EpnDateInsert { get; set; } = null;
        public DateTime? EpnDateUpdate { get; set; } = null;
    }
}
