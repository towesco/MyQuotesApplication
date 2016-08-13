using Facebook;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using MyQuotes.Infrastructure.Users;
using MyQuotes.Infrastructures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Filters;

namespace MyQuotes.Controllers
{
    public class HomeController : Controller
    {
        #region Identity Gets

        public UserAppManager usermanager
        {
            get { return HttpContext.GetOwinContext().GetUserManager<UserAppManager>(); }
        }

        public RoleAppManager rolemanager
        {
            get
            {
                return HttpContext.GetOwinContext().GetUserManager<RoleAppManager>();
            }
        }

        public IAuthenticationManager Authen
        {
            get { return HttpContext.GetOwinContext().Authentication; }
        }

        #endregion Identity Gets

        public ActionResult deneme()
        {
            return View();
        }

        public ActionResult Index()

        {
            if (User.Identity.IsAuthenticated)
            {
                Response.Redirect("/Users/index");
            }

            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult FacebookLogin(string ReturnUrl)
        {
            AuthenticationProperties properties = new AuthenticationProperties
            {
                RedirectUri = Url.Action("facebookcallback", new { ReturnUrl = ReturnUrl })
            };

            Authen.Challenge(properties, "Facebook");
            return new HttpUnauthorizedResult();
        }

        [AllowAnonymous]
        public async Task<ActionResult> facebookcallback(string ReturnUrl)
        {
            ExternalLoginInfo info = await Authen.GetExternalLoginInfoAsync();

            var user = await usermanager.FindAsync(info.Login);

            if (user == null)
            {
                var token = HttpContext.GetOwinContext()
                                  .Authentication.GetExternalIdentity(DefaultAuthenticationTypes.ExternalCookie).FindFirstValue("FacebookAccessToken");
                var fb = new FacebookClient(token);

                dynamic infoEmail = fb.Get("/me?fields=email");

                var me = fb.Get("me") as JsonObject;
                var userId = me["id"];

                ////user picture:  http://graph.facebook.com/10206530076964065/picture?type=large

                string profilImage = "http://graph.facebook.com/" + userId + "/picture?type=large";

                user = new UserApp { Email = infoEmail.email, UserName = info.DefaultUserName, createTime = DateTime.Now, PicturePath = profilImage };

                var result = await usermanager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await usermanager.AddLoginAsync(user.Id, info.Login);

                    Helper.CreateExtensionsCookie(user.Id);
                }
                else
                {
                    //hata mesajı yazılacak
                }
            }
            else
            {
                Helper.CreateExtensionsCookie(user.Id);
            }

            ClaimsIdentity identity = await usermanager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
            identity.AddClaims(info.ExternalIdentity.Claims);
            HttpContext.GetOwinContext().Authentication.SignIn(new AuthenticationProperties { IsPersistent = true, ExpiresUtc = DateTime.Now.AddDays(120) }, identity);

            //return Redirect(ReturnUrl ?? "/User/Index");
            return RedirectToAction("Index", "Users");
        }
    }
}