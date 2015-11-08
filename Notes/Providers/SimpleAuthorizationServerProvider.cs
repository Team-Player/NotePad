using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Notes.Entities;
using Notes.Models;
using NLog;

namespace Notes.Providers
{
    public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // allow all clients
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            DateTime start = DateTime.Now;            

            // allow CORS to "*" domains
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            string
                role = "",
                userId = "",
                nickName = "",
                login = "";

            UserRepository users = new UserRepository();
            User user = users.GetByName(context.UserName);

            if (user == null)
            {
                context.SetError("invalid_grant", "The user name is incorrect.");
                return;
            }

            if (context.Password != user.Password)
            {
                context.SetError("invalid_grant", "The password is incorrect.");
                return;
            }

            if (user.Admin == null)
            {
                context.SetError("invalid_grant", "User is blocked.");
                return;
            }

            // role is user privileges in the local (web) application
            role = user.Admin.Value ? "Admin" : "User";
            // id need for fast request to users table (find by id more fast than by name)
            userId = user.Id.ToString();
            // displayed name to application window
            nickName = user.Login; // This appropriation is unacceptable
            // private name, used as login (using for server access)
            login = context.UserName;
            // bad practice when: nickName = userName

            // "identity" sent to client as private data
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim("id", userId));
            identity.AddClaim(new Claim("role", role));
            identity.AddClaim(new Claim("login", login));

            // "props" sent to client as public data
            var props = new AuthenticationProperties(new Dictionary<string, string>
                {
                    { "userId", userId },
                    { "userRole", role },
                    { "nickName", nickName }
                });

            // creating response "ticket" for client request
            var ticket = new AuthenticationTicket(identity, props);

            #region LOGGER: Block for refactoring
            // ======================================================
            // ------------------------------------------------------
            Client clt = new Client() { Ip = "127.0.0.1", Agent = "Chrome" };

            var text =
                "{\"lvl\":\"TRACE\",\"time\":\"" +
                String.Format("{0:HH:mm:ss.fff}", DateTime.Now).ToString() +
                "\",\"userId\":" + userId +
                ",\"login\":\"" + login +
                "\",\"role\":\"" + role +
                "\",\"act\":\"LOGIN\",\"ip\":\"" + clt.Ip +
                "\",\"agent\":\"" + clt.Agent +
                "\",\"lag\":" + (DateTime.Now - start).Milliseconds.ToString() +
                ",\"stat\":200,\"message\":\"Ok\"},"; 

            Logger log = LogManager.GetCurrentClassLogger();
            
            log.Trace(text);
            // ------------------------------------------------------
            // ======================================================
            #endregion

            context.Validated(ticket);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }
    }
}