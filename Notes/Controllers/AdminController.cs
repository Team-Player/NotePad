using Notes.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Security.Claims;
using System.Threading;

namespace Notes.Controllers
{
    [RoutePrefix("api/Admin")]
    public class AdminController : ApiController
    {
        [Authorize]
        public IHttpActionResult Get()
        {
            ClaimsPrincipal identity = (ClaimsPrincipal)Thread.CurrentPrincipal;
            var role = identity.Claims.Where(c => c.Type == "role").Select(c => c.Value).SingleOrDefault();

            if (role == "Admin")
            {
                string text = System.IO.File.ReadAllText(@"D:\_VS_2015\Notes\Notes\Logs\Notes.log");
                int ind = text.Length - 1;
                text = "[" + text.Remove(ind) + "]";

                List<LogRow> data;

                data = JsonConvert.DeserializeObject<List<LogRow>>(text);

                return Ok(data);
            }

            return Unauthorized();
        }
    }
}
