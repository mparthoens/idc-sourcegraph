using FluentValidation;

namespace Csw.Application.Identifiers.Commands.CreateIdentifier
{
    public class CreateIdentifierCommandValidator : AbstractValidator<CreateIdentifierCommand>
    {
        public CreateIdentifierCommandValidator()
        {
            RuleFor(dto => dto.Lastname).NotEmpty();
        }
    }
}
