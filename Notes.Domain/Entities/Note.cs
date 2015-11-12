using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Notes.Domain.Entities
{
    public class Note
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime CreateTime { get; set; }
        public bool Publish { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
    }
}
