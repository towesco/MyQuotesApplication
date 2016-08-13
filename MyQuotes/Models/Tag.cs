using MyQuotes.Infrastructures;
using MyQuotes.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyQuotes.Models
{
    public class Tag
    {
        public string TagName { get; set; }
        public int TagCount { get; set; }

        private string url;

        public string Url
        {
            get
            {
                return Helper.UrlSeo(url);
            }
            set
            {
                this.url = value;
            }
        }
    }
}