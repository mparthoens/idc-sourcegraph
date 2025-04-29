using AutoMapper;
using Csw.Application.Identifications.Dtos;
using Csw.Domain.Entities;
using Csw.Domain.Exceptions;
using Csw.Domain.Repositories;
using MediatR;

namespace Csw.Application.Identifications.Queries.GetIdentificationById
{
    public class GetIdentificationByIdQueryHandler(IMapper mapper, IIdentificationsRepository identificationsRepository) :
        IRequestHandler<GetIdentificationByIdQuery, IdentificationDto>
    {
        public async Task<IdentificationDto> Handle(GetIdentificationByIdQuery request, CancellationToken cancellationToken)
        {
            var identification = await identificationsRepository.GetByIdAsync(request.Id);

            if (identification == null)
            {
                throw new NotFoundException(nameof(Identification), request.Id.ToString());
            }

            var identificationDto = mapper.Map<IdentificationDto>(identification);

            return identificationDto;
        }
    }
}


