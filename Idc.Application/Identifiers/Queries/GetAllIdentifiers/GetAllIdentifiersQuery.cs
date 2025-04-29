using Csw.Application.Identifiers.Dtos;
using MediatR;

namespace Csw.Application.Identifiers.Queries.GetAllIdentifiers
{
  public class GetAllIdentifiersQuery : IRequest<IEnumerable<IdentifierDto>>
  {
  }
}
