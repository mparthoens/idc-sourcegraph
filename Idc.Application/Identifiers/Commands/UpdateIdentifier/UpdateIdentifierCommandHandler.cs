using AutoMapper;
using Csw.Domain.Entities;
using Csw.Domain.Exceptions;
using Csw.Domain.Repositories;
using MediatR;

namespace Csw.Application.Identifiers.Commands.UpdateIdentifier
{
    public class UpdateIdentifierCommandHandler(IIdentifiersRepository identifiersRepository, IMapper mapper) :
        IRequestHandler<UpdateIdentifierCommand>
    {
        public async Task Handle(UpdateIdentifierCommand request, CancellationToken cancellationToken)
        {
            var identifier = await identifiersRepository.GetByIdAsync(request.Id);
            if (identifier == null)
            {
                throw new NotFoundException(nameof(Identifier), request.Id.ToString());
            }
            mapper.Map(request, identifier);

            await identifiersRepository.SaveChanges();
        }
    }
}
