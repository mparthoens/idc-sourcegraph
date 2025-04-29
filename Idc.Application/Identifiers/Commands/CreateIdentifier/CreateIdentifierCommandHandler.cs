using AutoMapper;
using Csw.Domain.Entities;
using Csw.Domain.Repositories;
using MediatR;

namespace Csw.Application.Identifiers.Commands.CreateIdentifier
{
    internal class CreateIdentifierCommandHandler(IMapper mapper, IIdentifiersRepository identifiersRepository) :
    IRequestHandler<CreateIdentifierCommand, int>
    {
        public async Task<int> Handle(CreateIdentifierCommand request, CancellationToken cancellationToken)
        {
            var identifier = mapper.Map<Identifier>(request);
            int id = await identifiersRepository.Create(identifier);
            return id;
        }
    }
}
