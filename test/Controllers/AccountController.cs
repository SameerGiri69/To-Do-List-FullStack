using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using test.DTOs;
using test.Model;

namespace test.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        [HttpPost]
        [Route("register")]

        public async Task<IActionResult> Register([FromBody] RegisterUserDto userDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var userExists = await _userManager.FindByEmailAsync(userDto.Email);

                if (userExists != null) return BadRequest("E-Mail is already registered use a different email");

                var appUser = new AppUser()
                {
                    Email = userDto.Email,
                    UserName = userDto.UserName,
                };

                var result = await _userManager.CreateAsync(appUser, userDto.Password);

                if (result.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                    if (roleResult.Succeeded)
                    {
                        return Ok("User Created");
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                return StatusCode(500, result.Errors);


            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if(user != null)
            {
                var signInResult = await _signInManager.PasswordSignInAsync(user, loginDto.Password, false, false);
                if (signInResult.Succeeded) return Ok();
                return BadRequest();
            }
            return BadRequest("user doesnot exists");
        }
        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            if (!HttpContext.User.Identity.IsAuthenticated)
                return BadRequest("Already logged out");
            await _signInManager.SignOutAsync();
            return Ok();
        }
    }
}
