using Microsoft.AspNetCore.Identity;

namespace Csw.Domain.Entities
{
    public class AspNetUser : IdentityUser
    {
        public string? Language { get; set; }
    }
}
