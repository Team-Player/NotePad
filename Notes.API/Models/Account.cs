using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Notes.API.Entities
{
    public class Account
    {
        public int UserId { get; set; }
        public string Role { get; set; }
        public string Login { get; set; }
    }
}