using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Facebook;
using MyQuotes.Infrastructure.Users;
using Owin;
using System;
using System.Threading.Tasks;

namespace MyQuotes
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.CreatePerOwinContext<UserAppDbContext>(() => new UserAppDbContext());
            app.CreatePerOwinContext<UserAppManager>(UserAppManager.Create);
            app.CreatePerOwinContext<RoleAppManager>(RoleAppManager.Create);

            app.UseCookieAuthentication(new CookieAuthenticationOptions()
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Home/Index"),
                LogoutPath = new PathString("/Home/Index"),
                CookieName = "myquotes",
                ExpireTimeSpan = TimeSpan.FromDays(120),
            });
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            #region FacebookLogin

            FacebookAuthenticationOptions f = new FacebookAuthenticationOptions
            {
                AppId = "310003379339696",
                AppSecret = "11185fb6dc9da45ac821a69ccd2bb213",
                Provider = new FacebookAuthenticationProvider()
                {
                    OnAuthenticated = context =>
                    {
                        context.Identity.AddClaim(new System.Security.Claims.Claim("FacebookAccessToken",
                            context.AccessToken));
                        return Task.FromResult(true);
                    }
                },
                SignInAsAuthenticationType = DefaultAuthenticationTypes.ExternalCookie,
            };
            f.Scope.Add("email");
            // f.Scope.Add("email");
            app.UseFacebookAuthentication(f);

            #endregion FacebookLogin
        }
    }
}