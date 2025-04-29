using Csw.Application.EpnSyncLogs.Commands.CreateEpnSyncLog;
using Csw.Application.EpnSyncLogs.Queries.GetEpnSyncLogById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Idc.API.Controllers
{
    [ApiController]
    [Route("api/epnsynclog")]
    [Authorize]
    public class EpnSynclogController(IMediator mediator) : ControllerBase
    {
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var epnSyncLog = await mediator.Send(new GetEpnSyncLogByIdQuery(id));
            return Ok(epnSyncLog);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEpnSyncLog(CreateEpnSyncLogCommand command)
        {
            int id = await mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id }, null);
        }
    }
}
