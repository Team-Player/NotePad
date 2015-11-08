using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Notes.Models;
using Notes.Entities;
using NLog;
using System.Threading;
using System.Linq;

namespace Notes.Controllers
{
    [Authorize]
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private UserRepository _users = null;

        public AccountController()
        {
            _users = new UserRepository();
        }

        // POST api/Account/Login -> /token (settings in "SimpleAuthorizationServerProvider.cs") 

        // POST api/Account/Logout
        [Route("Logout")]
        public IHttpActionResult Post()
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
