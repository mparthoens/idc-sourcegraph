using AutoMapper;
using Csw.Domain.Entities;
using Csw.Domain.Exceptions;
using Csw.Domain.Repositories;
using MediatR;

namespace Csw.Application.Identifications.Commands.UpdateIdentification
{
    public class UpdateIdentificationEpnDatesCommandHandler(IIdentificationsRepository identificationsRepository, IMapper mapper) : IRequestHandler<UpdateIdentificationEpnDatesCommand>
    {
        public async Task Handle(UpdateIdentificationEpnDatesCommand request, CancellationToken cancellation)
        {
            var identification = await identificationsRepository.GetByIdAsync(request.Id);
            if (identification == null)
            {
                throw new NotFoundException(nameof(Identification), request.Id.ToString());
            }

            mapper.Map(request, identification);

            await identificationsRepository.SaveChanges();
        }
    }
}
