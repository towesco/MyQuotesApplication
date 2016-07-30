using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace MyQuotes.Controllers
{
    public class bosController : ApiController
    {
        [HttpGet]
        [Route("api/bos/complete")]
        public IHttpActionResult jsonQuotes(string term)
        {
            System.Threading.Thread.Sleep(500);
            List<string> veri = new List<string>() { "fatih", "fatma", "şeyda", "zeliha", "şeyma", "şeysu" };

            List<string> filter = veri.Where(a => a.StartsWith(term)).ToList();

            return Json<List<string>>(filter);
        }
    }
}