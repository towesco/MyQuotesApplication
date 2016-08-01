using Newtonsoft.Json;
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

        [JsonProperty("profilId")]
        public string ProfilId { get; set; }

        [StringLength(500)]
        [JsonProperty("picture")]
        public string Picture { get; set; }

        [JsonProperty("quoteNote")]
        [Column(TypeName = "varchar(MAX)")]
        public string QuoteNote { get; set; }

        [JsonProperty("url")]
        [StringLength(500)]
        public string Url { get; set; }

        [JsonProperty("tag")]
        [StringLength(500)]
        public string Tag { get; set; }

        [JsonProperty("favorite")]
        public bool Favorite { get; set; }
    }
}