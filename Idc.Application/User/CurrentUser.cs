namespace Csw.Application.User
{
    public record CurrentUser(String Id,
        string Email, IEnumerable<string> Roles,
        string? language)
    {
        public bool IsInRole(string role) => Roles.Contains(role);
    }
}
