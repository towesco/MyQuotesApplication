using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyQuotes.Infrastructures
{
    public class Helper
    {
        public static void CreateExtensionsCookie(string id)
        {
            HttpCookie cookie = new HttpCookie("MyQuotes");

            cookie["Id"] = id.ToString();

            HttpContext.Current.Response.Cookies.Add(cookie);
        }
    }
}