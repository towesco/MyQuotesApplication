using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MyQuotes.Models
{
    public class QuotesDb : DbContext
    {
        public QuotesDb()
            : base("MyQuotesDBEntities")
        {
        }

        public DbSet<Quotes> Quotes { get; set; }
    }
}