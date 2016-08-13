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

        public static string UrlSeo(string Metin)
        {
            string deger = Metin;
            deger = deger.Replace("'", "");
            deger = deger.Replace(" ", "_");
            deger = deger.Replace("<", "");
            deger = deger.Replace(">", "");
            deger = deger.Replace("&", "");
            deger = deger.Replace("[", "");
            deger = deger.Replace("]", "");
            deger = deger.Replace("ı", "i");
            deger = deger.Replace("ö", "o");
            deger = deger.Replace("ü", "u");
            deger = deger.Replace("ş", "s");
            deger = deger.Replace("ç", "c");
            deger = deger.Replace("ğ", "g");
            deger = deger.Replace("İ", "i");
            deger = deger.Replace("Ö", "o");
            deger = deger.Replace("Ü", "u");
            deger = deger.Replace("Ş", "s");
            deger = deger.Replace("Ç", "c");
            deger = deger.Replace("Ğ", "g");

            return deger;
        }
    }
}