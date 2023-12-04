using Core.Entities.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(Roles ="Admin")]
    public class AdminController : BaseApiController
    {
        public AdminController()
        {    
        }

        //[HttpGet]
        //public async Task<ActionResult<AppUser>> GetAllUsersAsync()
        //{
        //    var users =
        //}
    }
}
