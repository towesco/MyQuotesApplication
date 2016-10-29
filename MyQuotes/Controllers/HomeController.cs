using Facebook;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using MyQuotes.Infrastructure.Users;
using MyQuotes.Infrastructures;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

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

        public ActionResult claims()
        {
            ClaimsIdentity ident = User.Identity as ClaimsIdentity;

            return View(ident.Claims.ToList());
        }

        public ActionResult Index()

        {
            ViewBag.Title = "Anasayfa";

            if (HelperPut.IsUserLogin())
            {
                return RedirectToAction("Index", "Users");
            }

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Title = "Hakkımızda";
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Title = "İletişim";
            return View();
        }

        public ActionResult Error()
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
                var token = Authen.GetExternalIdentity(DefaultAuthenticationTypes.ExternalCookie).FindFirstValue("FacebookAccessToken");
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

                    HelperPut.CreateExtensionsCookie(user.Id);
                }
                else
                {
                    //hata mesajı yazılacak
                }
            }
            else
            {
                HelperPut.CreateExtensionsCookie(user.Id);
            }

            ClaimsIdentity identity = await usermanager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
            identity.AddClaims(info.ExternalIdentity.Claims);
            Authen.SignOut();
            Authen.SignIn(new AuthenticationProperties { IsPersistent = true, ExpiresUtc = DateTimeOffset.MaxValue }, identity);

            //return Redirect(ReturnUrl ?? "/User/Index");
            return RedirectToAction("Index", "Users");
        }
    }
}