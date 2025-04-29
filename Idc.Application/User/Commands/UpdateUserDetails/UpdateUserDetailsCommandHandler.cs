using Csw.Domain.Entities;
using Csw.Domain.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Csw.Application.User.Commands.UpdateUserDetails
{
    public class UpdateUserDetailsCommandHandler(IUserContext userContext,
        IUserStore<AspNetUser> userStore) : IRequestHandler<UpdateUserDetailsCommand>
    {
        public async Task Handle(UpdateUserDetailsCommand request, CancellationToken cancellationToken)
        {
            var user = userContext.GetCurrentUser();

            var dbUser = await userStore.FindByIdAsync(user!.Id, cancellationToken);

            if (dbUser == null)
            {
                throw new NotFoundException(nameof(AspNetUser), user!.Id);
            }

            dbUser.Language = request.Language;

            await userStore.UpdateAsync(dbUser, cancellationToken);
        }
    }
}
