using Csw.Application.Identifiers.Commands.CreateIdentifier;
using Csw.Application.Identifiers.Commands.DeleteIdentifier;
using Csw.Application.Identifiers.Commands.UpdateIdentifier;
using Csw.Application.Identifiers.Queries.GetAllIdentifiers;
using Csw.Application.Identifiers.Queries.GetIdentifierById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Idc.API.Controllers
{
    [ApiController]
    [Route("api/identifiers")]
    [Authorize]
    public class IdentifierController(IMediator mediator) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var identifiers = await mediator.Send(new GetAllIdentifiersQuery());
            return Ok(identifiers);

        }
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var identifier = await mediator.Send(new GetIdentifierByIdQuery(id));
            return Ok(identifier);
        }

        [HttpPost]
        public async Task<IActionResult> CreateIdentifier(CreateIdentifierCommand command)
        {
            int id = await mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id }, null);
        }

        [HttpPatch("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateIdentifier(int id, UpdateIdentifierCommand command)
        {
            command.Id = id;
            await mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteIdentifier(int id)
        {
            await mediator.Send(new DeleteIdentifierCommand(id));

            return NoContent();
        }
    }
}
