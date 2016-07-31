using Microsoft.AspNet.Identity.EntityFramework;

namespace MyQuotes.Infrastructure.Users
{
    public class UserAppDbContext : IdentityDbContext<UserApp>
    {
        public UserAppDbContext()
            : base("MyQuotesDBEntities")
        {
        }
    }
}