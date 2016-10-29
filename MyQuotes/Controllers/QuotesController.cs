using MyQuotes.Infrastructures;
using MyQuotes.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace MyQuotes.Controllers
{
    //[EnableCors(origins: "http://www.putnotes.net", headers: "*", methods: "*")]
    public class QuotesController : ApiController
    {
        private QuotesDb db = new QuotesDb();

        [HttpGet]
        [Route("api/quotes/GetTagList/{id}")]
        public IHttpActionResult GetTagList(string id, string term)
        {
            List<string> filter = db.Quotes.Where(a => a.ProfilId == id && a.Tag.StartsWith(term)).Select(a => a.Tag).Distinct().ToList();

            return Json<List<string>>(filter);
        }

        // GET: api/Quotes
        [Route("api/quotes/GetQuotesById/{id}")]
        public IQueryable<Quotes> GetQuotesById(string id)
        {
            return db.Quotes.Where(a => a.ProfilId == id).OrderByDescending(a => a.CreateTime).AsQueryable();
        }

        [Route("api/quotes/GetQuotesByFavorites/{id}")]
        public IQueryable<Quotes> GetQuotesByFavorites(string id)
        {
            return db.Quotes.Where(a => a.ProfilId == id && a.Favorite == true).OrderByDescending(a => a.CreateTime).AsQueryable();
        }

        [Route("api/quotes/GetQuotes/{id}/{tag}")]
        public IQueryable<Quotes> GetQuotes(string id, string tag)
        {
            //  System.Threading.Thread.Sleep(3000);
            return db.Quotes.AsEnumerable().Where(a => a.ProfilId == id && HelperPut.UrlSeo(a.Tag) == tag).OrderByDescending(a => a.CreateTime).AsQueryable();
        }

        [Route("api/quotes/GetQuotesByColor/{id}/{color}")]
        public IQueryable<Quotes> GetQuotesByColor(string id, string color)
        {
            //  System.Threading.Thread.Sleep(3000);
            return db.Quotes.Where(a => a.ProfilId == id && a.Color == color).OrderByDescending(a => a.CreateTime).AsQueryable();
        }

        [Route("api/quotes/GetQutesFavoriteActive/{pid}/{id}")]
        public IHttpActionResult GetQutesFavoriteActive(string pid, int id)
        {
            Quotes q = db.Quotes.Where(a => a.ProfilId == pid && a.Id == id).First();

            if (q.Favorite)
            {
                q.Favorite = false;
            }
            else
            {
                q.Favorite = true;
            }

            db.SaveChanges();
            return Ok(q);
        }

        [Route("api/quotes/GetQutesTagList/{id}")]
        public IHttpActionResult GetQutesTagList(string id)
        {
            int total = db.Quotes.Where(a => a.ProfilId == id).Count();
            Tag totalTag = new Tag { TagName = "Tüm notlarım", TagCount = total, Url = "#/list" };
            int favoriteTotal = db.Quotes.Where(a => a.ProfilId == id && a.Favorite == true).Count();

            Tag totalFavorite = new Tag { TagName = "Favorilerim", TagCount = favoriteTotal, Url = "#/list/favorities" };
            List<Tag> tagList = (from c in db.Quotes
                                 where c.ProfilId == id
                                 group c by c.Tag into d
                                 select new Tag
                                 {
                                     TagName = d.Key,
                                     TagCount = d.Count(),
                                     Url = "#/tag/" + d.Key
                                 }).ToList();

            List<Tag> AllTagList = new List<Tag>();

            AllTagList.Add(totalTag);
            AllTagList.Add(totalFavorite);

            AllTagList.AddRange(tagList);

            return Ok(AllTagList);
        }

        [Route("api/quotes/GetQutesTagUpdate/{pid}/{id}/{tag}")]
        public IHttpActionResult GetQutesTagUpdate(string pid, int id, string tag)
        {
            Quotes q = db.Quotes.Where(a => a.ProfilId == pid && a.Id == id).First();

            q.Tag = tag;
            db.SaveChanges();
            return Ok();
        }

        [Route("api/quotes/GetUpdateColor/{pid}/{id}/{color}")]
        public IHttpActionResult GetUpdateColor(string pid, int id, string color)
        {
            Quotes q = db.Quotes.Where(a => a.ProfilId == pid && a.Id == id).First();

            q.Color = color;
            db.SaveChanges();
            return Ok();
        }

        // GET: api/Quotes/5
        [ResponseType(typeof(Quotes))]
        public async Task<IHttpActionResult> GetQuotes(int id)
        {
            Quotes quotes = await db.Quotes.FindAsync(id);
            if (quotes == null)
            {
                return NotFound();
            }

            return Ok(quotes);
        }

        // PUT: api/Quotes/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutQuotes(int id, Quotes quotes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != quotes.Id)
            {
                return BadRequest();
            }

            db.Entry(quotes).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuotesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Quotes
        [ResponseType(typeof(Quotes))]
        public async Task<IHttpActionResult> PostQuotes(Quotes quotes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            quotes.CreateTime = DateTime.Now;
            quotes.Color = "box1";
            db.Quotes.Add(quotes);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = quotes.Id }, quotes);
        }

        [HttpDelete]
        // DELETE: api/Quotes/5
        [ResponseType(typeof(Quotes))]
        public async Task<IHttpActionResult> DeleteQuotes(int id)
        {
            Quotes quotes = await db.Quotes.FindAsync(id);
            if (quotes == null)
            {
                return NotFound();
            }

            db.Quotes.Remove(quotes);
            await db.SaveChangesAsync();

            return Ok(quotes);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool QuotesExists(int id)
        {
            return db.Quotes.Count(e => e.Id == id) > 0;
        }
    }
}