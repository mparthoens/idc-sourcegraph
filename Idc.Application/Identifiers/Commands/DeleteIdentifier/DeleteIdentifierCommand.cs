using MediatR;

namespace Csw.Application.Identifiers.Commands.DeleteIdentifier
{
    public class DeleteIdentifierCommand(int id) : IRequest
    {
        public int Id { get; } = id;
    }
}
