using System.Data.Entity;

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