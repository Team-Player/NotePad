using Microsoft.Owin.Security;
using NLog;
using Notes.Auth.Entities;
using Notes.Auth.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Web.Http;

namespace Notes.Auth.Controllers
{
    [Authorize]
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private AuthRepository _users = null;

        public AccountController()
        {
            _users = new AuthRepository();
        }

        // POST: api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public IHttpActionResult Register(UserRegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User user = new User()
            {
                Login = model.Login,
                Password = model.Password,
                Admin = false
            };

            int? id = _users.Create(user);

            if (id == null) { return InternalServerError(); }

            return Ok(id);
        }

        // POST: api/Account/Logout
        [AllowAnonymous]
        [Route("Logout")]
        public IHttpActionResult Logout()
        {
            #region LOGGER: Block for refactoring
            // ======================================================
            // ------------------------------------------------------
            DateTime start = DateTime.Now;
            Client clt = new Client() { Ip = "127.0.0.1", Agent = "Chrome" };
            Account acc = new Account() { UserId = 0, Role = null, Login = null };
            ClaimsPrincipal identity = (ClaimsPrincipal)Thread.CurrentPrincipal;

            acc.UserId = Convert.ToInt32(identity.Claims.Where(c => c.Type == "id").Select(c => c.Value).SingleOrDefault());
            acc.Role = identity.Claims.Where(c => c.Type == "role").Select(c => c.Value).SingleOrDefault();
            acc.Login = identity.Claims.Where(c => c.Type == "login").Select(c => c.Value).SingleOrDefault();

            if (acc.Role == null) { acc.Role = "Public"; }
            if (acc.Login == null) { acc.Login = "Unknown"; }

            var text =
                "{\"lvl\":\"TRACE\",\"time\":\"" +
                String.Format("{0:HH:mm:ss.fff}", DateTime.Now).ToString() +
                "\",\"userId\":" + acc.UserId +
                ",\"login\":\"" + acc.Login +
                "\",\"role\":\"" + acc.Role +
                "\",\"act\":\"LOGOUT\",\"ip\":\"" + clt.Ip +
                "\",\"agent\":\"" + clt.Agent +
                "\",\"lag\":" + (DateTime.Now - start).Milliseconds.ToString() +
                ",\"stat\":200,\"message\":\"Ok\"},";

            Logger log = LogManager.GetCurrentClassLogger();

            log.Trace(text);
            // ------------------------------------------------------
            // ======================================================
            #endregion

            //Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
            return Ok();
        }
        // GET: api/Account
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET: api/Account/5
        //public string Get(int id)
        //{
        //    return "value";
        //}        

        // PUT: api/Account/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE: api/Account/5
        //public void Delete(int id)
        //{
        //}

        #region Вспомогательные приложения

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _users.Dispose();
            }

            base.Dispose(disposing);
        }

        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        #endregion
    }
}
