using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using MyQuotes.Infrastructure.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace MyQuotes.Infrastructures
{
    public class HelperPut
    {
        public static void CreateExtensionsCookie(string id)
        {
            HttpCookie cookie = new HttpCookie("Putnotes");

            cookie["Id"] = id.ToString();

            cookie.Expires = DateTime.Now.AddDays(600);
            HttpContext.Current.Response.Cookies.Add(cookie);
        }

        public static void DeleteExtensionsCookie()
        {
            HttpCookie cookie = new HttpCookie("Putnotes");

            cookie.Expires = DateTime.Now.AddDays(-1);
            HttpContext.Current.Response.Cookies.Add(cookie);
        }

        public static bool IsUserLogin()
        {
            bool IsUser = false;

            if (!HttpContext.Current.User.Identity.IsAuthenticated)
            {
                HttpCookie cookie = HttpContext.Current.Request.Cookies["Putnotes"];

                if (cookie != null)
                {
                    var Id = cookie["Id"];

                    UserAppManager userManager = HttpContext.Current.GetOwinContext().GetUserManager<UserAppManager>();

                    UserApp user = userManager.FindById(Id);

                    if (user != null)
                    {
                        ClaimsIdentity identity = userManager.CreateIdentity(user, DefaultAuthenticationTypes.ApplicationCookie);
                        HttpContext.Current.GetOwinContext().Authentication.SignIn(new AuthenticationProperties { IsPersistent = true, ExpiresUtc = DateTimeOffset.MaxValue }, identity);

                        IsUser = true;
                    }
                }
            }
            else
            {
                IsUser = true;
            }

            return IsUser;
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