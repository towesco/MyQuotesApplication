using Microsoft.AspNet.Identity.EntityFramework;
using System;

namespace MyQuotes.Infrastructure.Users
{
    public class UserApp : IdentityUser
    {
        public DateTime createTime { get; set; }
    }
}