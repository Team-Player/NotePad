using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Web;
using System.Web.Http;
using Microsoft.Owin.Security;
using Notes.API.Entities;
using Notes.API.Models;
using NLog;

namespace Notes.API.Controllers
{
    [RoutePrefix("api/Notes")]
    public class NotesController : ApiController
    {
        private readonly NoteRepository _notes = null;

        public NotesController()
        {
            _notes = new NoteRepository();
        }

        // CREATE note: POST api/notes - new note
        [Authorize]
        public IHttpActionResult Post(NoteCreateModel data)
        {
            int start = DateTime.Now.Millisecond;
            Account acc = Acc((ClaimsPrincipal)Thread.CurrentPrincipal);
            Client clt = new Client() { Ip = "127.0.0.1", Agent = "Chrome" };

            if (!ModelState.IsValid)
            {
                Log( start, "INFO", "CREATE", acc, clt, 300, "BadRequest" );             
                return BadRequest(ModelState);
            }

            // May add a check: Claims.userId == data.UserId

            Note note = new Note()
            {
                // data from client
                UserId = data.UserId,
                Publish = data.Publish,
                Title = data.Title,
                Body = data.Body,
                // server data
                CreateTime = DateTime.UtcNow
            };

            int? id = _notes.Create(note);

            if (id == null)
            {
                Log(start, "ERROR", "CREATE", acc, clt, 400, "Exception");                
                return BadRequest(); // need change to Exception(e)
            }

            Log(start, "TRACE", "CREATE", acc, clt, 200, "Ok");            
            return Ok(id);
        }

        // READ ALL: GET api/notes - list of notes
        public IHttpActionResult Get()
        {
            int start = DateTime.Now.Millisecond;
            Account acc = Acc((ClaimsPrincipal)Thread.CurrentPrincipal);
            Client clt = new Client() { Ip = "127.0.0.1", Agent = "Chrome" };

            List<Note> notes;

            switch (acc.Role)
            {
                case "Admin":
                    notes = _notes.GetAll();
                    break;

                case "User":
                    notes = _notes.GetByUserId(acc.UserId);
                    break;

                default:
                    notes = _notes.GetPublic();
                    break;
            }

            Log(start, "TRACE", "READ ALL", acc, clt, 200, "Ok");
            return Ok(notes);
        }

        // READ note: GET api/notes/5 - GetById
        public IHttpActionResult Get(int id)
        {
            int start = DateTime.Now.Millisecond;
            Account acc = Acc((ClaimsPrincipal)Thread.CurrentPrincipal);
            Client clt = new Client() { Ip = "127.0.0.1", Agent = "Chrome" };

            Note note = _notes.GetById(id);
            
            if (note == null)
            {
                Log(start, "DEBUG", "READ BY ID", acc, clt, 404, "NotFound");                
                return NotFound();
            }

            if (note.Publish || note.UserId == acc.UserId || acc.Role == "Admin")
            {
                Log(start, "TRACE", "READ BY ID", acc, clt, 200, "Ok");
                return Ok(note);
            }

            Log(start, "WARNING", "READ BY ID", acc, clt, 400, "Unauthorized");
            return Unauthorized();
        }

        // UPDATE note: PUT api/values/5
        [Authorize]
        public IHttpActionResult Put(int id, NoteUpdateModel data)
        {
            int start = DateTime.Now.Millisecond;
            Account acc = Acc((ClaimsPrincipal)Thread.CurrentPrincipal);
            Client clt = new Client() { Ip = "127.0.0.1", Agent = "Chrome" };

            if (!ModelState.IsValid)
            {
                Log(start, "INFO", "UPDATE", acc, clt, 300, "BadRequest");
                return BadRequest(ModelState);
            }

            Note note = _notes.GetById(id);

            if (note == null)
            {
                Log(start, "DEBUG", "UPDATE", acc, clt, 404, "NotFound");
                return NotFound();
            }

            if (note.UserId == acc.UserId || acc.Role == "Admin")
            {
                Note upNote = new Note()
                {
                    Id = id,
                    Publish = data.Publish,
                    Title = data.Title,
                    Body = data.Body
                };

                _notes.Update(upNote);

                Log(start, "TRACE", "UPDATE", acc, clt, 200, "Ok");
                return Ok();
            }
            
            Log(start, "WARNING", "UPDATE", acc, clt, 400, "Unauthorized");
            return Unauthorized();
        }

        // DELETE note: DELETE api/values/5
        [Authorize]
        public IHttpActionResult Delete(int id)
        {
            int start = DateTime.Now.Millisecond;
            Account acc = Acc((ClaimsPrincipal)Thread.CurrentPrincipal);
            Client clt = new Client() { Ip = "127.0.0.1", Agent = "Chrome" };

            Note note = _notes.GetById(id);

            if (note == null)
            {
                Log(start, "DEBUG", "DELETE", acc, clt, 404, "NotFound");
                return NotFound();
            }

            if (note.UserId == acc.UserId || acc.Role == "Admin")
            {
                _notes.Delete(id);

                Log(start, "TRACE", "DELETE", acc, clt, 200, "Ok");
                return Ok();
            }

            Log(start, "WARNING", "DELETE", acc, clt, 400, "Unauthorized");
            return Unauthorized();
        }

        #region Вспомогательные приложения

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _notes.Dispose();
            }

            base.Dispose(disposing);
        }

        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        private void Log(            
            int start, string lvl, string act,
            Account acc, Client clt,
            int stat, string mes
            )
        {
            string time = String.Format("{0:HH:mm:ss.fff}", DateTime.Now).ToString();
            int lag = (DateTime.Now.Millisecond - start);

            var text =
                "{" +
                "\"lvl\":\"" + lvl + "\"," +
                "\"time\":\"" + time + "\"," +
                "\"userId\":" + acc.UserId.ToString() + "," +
                "\"login\":\"" + acc.Login + "\"," +
                "\"role\":\"" + acc.Role + "\"," +
                "\"act\":\"" + act + "\"," +
                "\"ip\":\"" + clt.Ip + "\"," +
                "\"agent\":\"" + clt.Agent + "\"," +
                "\"lag\":" + lag.ToString() + "," +
                "\"stat\":" + stat.ToString() + "," +
                "\"message\":\"" + mes + "\"" +
                "},";

            Logger log = LogManager.GetCurrentClassLogger();

            log.Trace(text);
        }

        private Account Acc (ClaimsPrincipal identity)
        {
            Account acc = new Account() { UserId = 0, Role = null, Login = null};
            
            acc.UserId = Convert.ToInt32(identity.Claims.Where(c => c.Type == "id").Select(c => c.Value).SingleOrDefault());
            acc.Role = identity.Claims.Where(c => c.Type == "role").Select(c => c.Value).SingleOrDefault();
            acc.Login = identity.Claims.Where(c => c.Type == "login").Select(c => c.Value).SingleOrDefault();

            if (acc.Role == null) { acc.Role = "Public"; }
            if (acc.Login == null) { acc.Login = "Unknown"; }

            return acc;
        }

        #endregion
    }
}
