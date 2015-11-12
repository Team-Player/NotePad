using Notes.MVC.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Notes.MVC.Controllers
{
    public class CultureController : Controller
    {
        // GET: Culture

        public ActionResult ChangeLanguage(string returnUrl, string lang)
        {
            new MultilingualUI().SetLanguage(lang);
            return RedirectToLocal(returnUrl);
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Home", "IndexPage");
        }
    }
}