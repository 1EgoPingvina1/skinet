using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class BuggyController : BaseApiController
    {
        private readonly StoreContext _context;

        public BuggyController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("NotFound")]
        public ActionResult GetNotFoundRequest()
        {
            var thing = _context.Products.Find(-1);
            if(thing == null)
                return NotFound(new ApiResponse(404));

            return Ok();
        }

        [HttpGet("ServerError")]
        public ActionResult GetServerError()
        {
            var thing = _context.Products.Find(-1);

            var thingToReturn = thing.ToString();

            return Ok();
        }

        [HttpGet("BadRequest")]
        public ActionResult GetbadRequest()
        {
            return BadRequest(new ApiResponse(400));
        }

        [HttpGet("BadRequest/{id}")]
        public ActionResult GetNotFoundRequest(int id)
        {
            return Ok();
        }
    }
}
