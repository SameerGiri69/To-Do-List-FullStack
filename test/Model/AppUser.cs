using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace test.Model
{
    public class AppUser : IdentityUser
    {
    
        public ICollection<UserTasks>? UserTasks { get; set; }
    }
}
