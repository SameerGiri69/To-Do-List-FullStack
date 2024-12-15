using test.DTOs;
using test.DTOs.ResponseDTOs;
using test.Model;

namespace test.Interface
{
    public interface IUserTasksRepository
    {
        public Task<CreateUserTasksResponseDto> CreateTask(CreateUserTasksDto dto, AppUser username);
        public List<GetUserTaskResponseDto> GetUserTask(string userId);
        public void SetIsCompleted(string taskId);
        public EditTaskResponseDto EditTask(EditTaskDto taskDto, string userId);
        public bool DeleteTask(string id);
        public bool Save();
    }
}
