using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/dummy")]
    public class DummyController : Controller
    {
        [HttpGet]
        [Route("get")]
        public IActionResult Index()
        {
            return Ok();
        }
    }
}
