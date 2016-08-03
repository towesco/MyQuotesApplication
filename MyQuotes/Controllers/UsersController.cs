using MyQuotes.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Filters;

namespace MyQuotes.Controllers
{
    [Authorize]
    public class UsersController : Controller
    {
        public string UserId { get; set; }

        protected override void OnAuthentication(AuthenticationContext filterContext)
        {
            ClaimsIdentity ident = HttpContext.User.Identity as ClaimsIdentity;
            var id = ident.Claims.Where(a => a.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").First().Value;

            this.UserId = id;
            ViewData["userId"] = UserId; ;

            base.OnAuthentication(filterContext);
        }

        // GET: Users
        public ActionResult Index()
        {
            QuotesDb q = new QuotesDb();

            int total = q.Quotes.Where(a => a.ProfilId == UserId).Count();

            Tag t = new Tag { TagName = "Hepsi", TagCount = total };

            List<Tag> tagList = (from c in q.Quotes
                                 where c.ProfilId == UserId
                                 group c by c.Tag into d
                                 select new Tag
                                 {
                                     TagName = d.Key,
                                     TagCount = d.Count()
                                 }).ToList();

            List<Tag> AllTagList = new List<Tag>();

            AllTagList.Add(t);
            AllTagList.AddRange(tagList);

            ViewBag.tagList = AllTagList;

            return View();
        }
    }
}