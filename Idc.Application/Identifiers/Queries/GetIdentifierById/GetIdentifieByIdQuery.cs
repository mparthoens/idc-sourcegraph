using Csw.Application.Identifiers.Dtos;
using MediatR;

namespace Csw.Application.Identifiers.Queries.GetIdentifierById
{
    public class GetIdentifierByIdQuery(int id) : IRequest<IdentifierDto>
    {
        public int Id { get; set; } = id;
    }
}
