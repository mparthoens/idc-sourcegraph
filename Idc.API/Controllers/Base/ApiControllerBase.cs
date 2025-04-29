// Controllers/Base/ApiControllerBase.cs
using Microsoft.AspNetCore.Mvc;

namespace Csw.API.Controllers.Base
{
	[ApiController]
	[Route("api/v1/[controller]")]
	public abstract class ApiControllerBase : ControllerBase
	{
		// Common controller functionality
	}
}
