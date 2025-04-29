using Csw.Domain.Entities;
using Csw.Domain.Exceptions;
using Csw.Domain.Repositories;
using MediatR;

namespace Csw.Application.Identifiers.Commands.DeleteIdentifier
{
    public class DeleteIdentifierCommandHandler(IIdentifiersRepository identifiersRepository) : IRequestHandler<DeleteIdentifierCommand>
    {
        public async Task Handle(DeleteIdentifierCommand request, CancellationToken cancellationToken)
        {
            var identifier = await identifiersRepository.GetByIdAsync(request.Id);
            if (identifier == null)
                throw new NotFoundException(nameof(Identifier), request.Id.ToString());

            await identifiersRepository.Delete(identifier);
        }
    }
}

