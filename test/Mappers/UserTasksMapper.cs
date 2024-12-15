using System.Reflection;
using test.DTOs;
using test.DTOs.ResponseDTOs;
using test.Model;

namespace test.Mappers
{
    public static class UserTasksMapper
    {
        public static UserTasks ToUserTasksFromCreateTasksDto(this CreateUserTasksDto dto, AppUser currUser )
        {
            return new UserTasks()
            {
                AppUserId = currUser.Id,
                AppUser = currUser,
                Title = dto.Title,
                Description = dto.Description,
            };
        }
        public static CreateUserTasksResponseDto ToCreateUserTasksResponseDtoFromUserTasks(this UserTasks userTasks)
        {
            return new CreateUserTasksResponseDto()
            {
                
                Title = userTasks.Title,
                Description = userTasks.Description,
            };
        }
        public static GetUserTaskResponseDto ToGetUserTaskResponseDtoFromUserTasks(this UserTasks userTasks)
        {
            return new GetUserTaskResponseDto()
            {
                Id = userTasks.Id,
                Title = userTasks.Title,
                Description = userTasks.Description,
                isCompleted = userTasks.isCompleted
            };
        }
        public static EditTaskResponseDto ToEditTaskResponseDtoFromUserTasks(this UserTasks userTasks)
        {
            return new EditTaskResponseDto()
            {
                Title = userTasks.Title,
                Description = userTasks.Description,
                IsCompleted = userTasks.isCompleted
            };
        }
    }
}
