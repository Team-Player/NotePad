using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Notes.Auth.Entities
{
    public class LogRow
    {
        public string Lvl { get; set; }
        public string Time { get; set; }
        public int UserId { get; set; }
        public string Login { get; set; }
        public string Role { get; set; }
        public string Act { get; set; }
        public string Ip { get; set; }
        public string Agent { get; set; }
        public int Lag { get; set; }
        public int Stat { get; set; }
        public string Message { get; set; }
    }
}