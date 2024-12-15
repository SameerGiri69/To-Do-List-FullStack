using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using test.Data;
using test.DTOs;
using test.DTOs.ResponseDTOs;
using test.Interface;
using test.Mappers;
using test.Model;

namespace test.Repository
{
    public class UserTasksRepository : IUserTasksRepository
    {
        private readonly ApplicationDbContext _context;

        public UserTasksRepository(ApplicationDbContext context,
            IHttpContextAccessor httpContextAccessor, UserManager<AppUser> userManager)
        {
            _context = context;
        }
        public  async Task<CreateUserTasksResponseDto> CreateTask(CreateUserTasksDto dto, AppUser currUser)
        {
            var userTask = dto.ToUserTasksFromCreateTasksDto(currUser);
            _context.UserTasks.Add(userTask);
            var result =  Save();
            if(result == true) return userTask.ToCreateUserTasksResponseDtoFromUserTasks();
            throw new Exception("Something went wrong while updating database");

        }

        public bool DeleteTask(string id)
        {
            var currTasks = _context.UserTasks.Where(x => x.Id == int.Parse(id)).First();
            _context.UserTasks.Remove(currTasks);
            return Save();
        }

        public EditTaskResponseDto EditTask(EditTaskDto taskDto, string taskId)
        {
            var currTask = _context.UserTasks.Where(x => x.Id == int.Parse(taskId)).First();
            currTask.Title = taskDto.Title;
            currTask.Description = taskDto.Description;
            currTask.isCompleted = taskDto.isCompleted;

            _context.UserTasks.Update(currTask);
            Save();
            return currTask.ToEditTaskResponseDtoFromUserTasks();

        }

        public  List<GetUserTaskResponseDto> GetUserTask(string userId)
        {
            var userTasks = _context.UserTasks.Where(x=>x.AppUserId == userId).ToList();
            return userTasks.Select(task => task.ToGetUserTaskResponseDtoFromUserTasks()).ToList();

            //List<GetUserTaskResponseDto> response = new List<GetUserTaskResponseDto>();

            //foreach (UserTasks tasks in userTasks)
            //{
            //    GetUserTaskResponseDto eachRespose = new GetUserTaskResponseDto();

            //    eachRespose.Id = tasks.Id;
            //    eachRespose.Title = tasks.Title;
            //    eachRespose.Description = tasks.Description;
            //    eachRespose.isCompleted = tasks.isCompleted;

            //    response.Add(eachRespose);
            //}
            //return response;

        }

        public bool Save()
        {
            var rowsAffected =  _context.SaveChanges();
            if (rowsAffected > 0)
                return true;
             return false;
        }

        public void SetIsCompleted(string taskId)
        {
            var task = _context.UserTasks.Where(x => x.Id == int.Parse(taskId)).FirstOrDefault();
            task.isCompleted = !task.isCompleted;
            _context.UserTasks.Update(task);
            Save();
        }
    }
}
