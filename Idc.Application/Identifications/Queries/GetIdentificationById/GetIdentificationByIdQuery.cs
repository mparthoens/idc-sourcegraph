using Csw.Application.Identifications.Dtos;
using MediatR;

namespace Csw.Application.Identifications.Queries.GetIdentificationById
{
    public class GetIdentificationByIdQuery(int id) : IRequest<IdentificationDto>
    {
        public int Id { get; set; } = id;
    }
}
