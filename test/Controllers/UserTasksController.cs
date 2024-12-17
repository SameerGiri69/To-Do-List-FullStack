using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using test.Data;
using test.DTOs;
using test.Interface;
using test.Model;

namespace test.Controllers
{
    
    [ApiController]
    [Route("api/task")]
    public class UserTasksController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IUserTasksRepository _userTasksRepository;
        private readonly UserManager<AppUser> _userManager;

        public UserTasksController(ApplicationDbContext context,
            IUserTasksRepository userTasksRepository, UserManager<AppUser> userManager)
        {
            _context = context;
            _userTasksRepository = userTasksRepository;
            _userManager = userManager;
        }
        [HttpPost]
        [Route("create-task")]
        public async Task<IActionResult> Create(CreateUserTasksDto tasksDto)
        {
            if (!ModelState.IsValid) return BadRequest("Enter the required information");
            var currUser = await _userManager.GetUserAsync(User);
            var result = await _userTasksRepository.CreateTask(tasksDto,currUser);
            return Ok(result);
        }
        [HttpGet]
        [Route("get-tasks")]
        public async Task<IActionResult> GerUserTasks()
        {
            var currUser = await _userManager.GetUserAsync(User);

            var userTasks = _userTasksRepository.GetUserTask(currUser.Id);

            if (userTasks == null) return Ok("You have no tasks for today");

            return Ok(userTasks.ToArray());
        }
        [HttpPost]
        [Route("set-iscompleted/{taskId}")]
        public async Task<IActionResult> SetIsCompleted(string taskId)
        {
            _userTasksRepository.SetIsCompleted(taskId);
            return Ok();
        }
        [HttpPut]
        [Route("edit-task")]
        public async Task<IActionResult> EditTask([FromBody] EditTaskDto editDto,string taskId)
        {
            var res = _userTasksRepository.EditTask(editDto, taskId);
            return Ok(res);
        }
        [HttpDelete]
        [Route("delete-task/{taskId}")]
        public async Task<IActionResult> DeleteTask(string taskId)
        {
            var res = _userTasksRepository.DeleteTask(taskId);
            if (res) return Ok();
            return BadRequest("Something went wrong");
        }
    }
}
