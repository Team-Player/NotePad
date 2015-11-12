using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Notes.API.Models
{
    public class NoteCreateModel
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public bool Publish { get; set; }

        [Required]
        [MaxLength(255)]
        public string Title { get; set; }

        [Required]
        [MaxLength(4000)]
        public string Body { get; set; }
    }

    public class NoteUpdateModel
    {
        [Required]
        public bool Publish { get; set; }

        [Required]
        [MaxLength(255)]
        public string Title { get; set; }

        [Required]
        [MaxLength(4000)]
        public string Body { get; set; }
    }
}