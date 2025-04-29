using MediatR;

namespace Csw.Application.User.Commands.UpdateUserDetails
{
    public class UpdateUserDetailsCommand : IRequest
    {
        public string? Language { get; set; }
    }
}
