using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Notes.Auth.Controllers
{
    [RoutePrefix("api/Test")]
    public class TestController : ApiController
    {
        //[Authorize]
        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok("Authorize test is success!");
        }
    }
}
