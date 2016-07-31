using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MyQuotes.Models
{
    public class Quotes
    {
        public int Id { get; set; }
        public int ProfilId { get; set; }

        [StringLength(500)]
        public string Picture { get; set; }

        [Column(TypeName = "varchar(MAX)")]
        public string quoteNote { get; set; }

        [StringLength(500)]
        public string url { get; set; }
    }
}