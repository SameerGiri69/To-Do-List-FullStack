using System.ComponentModel.DataAnnotations;

namespace test.Model
{
    public class UserTasks
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool isCompleted { get; set; } = false;
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}
