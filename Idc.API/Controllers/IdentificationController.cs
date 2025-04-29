using Csw.Application.Identifications.Commands.UpdateIdentification;
using Csw.Application.Identifications.Queries.GetIdentificationsForEpnSync;
using Csw.Domain.Repositories;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Idc.API.Controllers
{
    [ApiController]
    [Route("api/identifications")]
    [Authorize]
    public class IdentificationController(IMediator mediator, IIdentificationsRepository identificationsRepository) : ControllerBase
    {
        [HttpGet("GetIdentificationsForEpnSync/{maxDate}")]
        public async Task<IActionResult> GetIdentificationsForEpnSyncFornDays(string maxDate)
        {
            var identifications = await mediator.Send(new GetIdentificationsForEpnSyncQuery(maxDate));
            return Ok(identifications);
        }


        [HttpGet("GetIdentificationsEpnDateInsertUpdateMax")]
        [AllowAnonymous]
        public IActionResult GetIdentificationsEpnDateInsertUpdateMax()
        {
            var maxGetIdentificationsEpnDateInsertUpdate = identificationsRepository.GetIdentificationsEpnDateInsertUpdateMax();
            return Ok(maxGetIdentificationsEpnDateInsertUpdate);
        }

        [HttpPatch("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateIdentificationEpnDates(int id, UpdateIdentificationEpnDatesCommand command)
        {
            command.Id = id;
            await mediator.Send(command);

            return NoContent();
        }
    }
}

