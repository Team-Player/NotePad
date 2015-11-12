using Notes.MVC.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Notes.MVC.Filters
{
    public class MUIAttribute : FilterAttribute, IActionFilter
    {
        // private Stopwatch timer;

        private string lng;

        public void OnActionExecuting(ActionExecutingContext filterContext)
        {
            /*  timer = Stopwatch.StartNew(); */

            string lang = null;
            HttpCookie langCookie = filterContext.HttpContext.Request.Cookies["UserLanguage"];
            if (langCookie != null)
            {
                lang = langCookie.Value;
            }
            else
            {
                var userLanguage = filterContext.HttpContext.Request.UserLanguages;
                var userLang = userLanguage != null ? userLanguage[0] : "";
                if (userLang != "")
                {
                    lang = userLang;
                    // lng = userLang;   
                }
                else
                {
                    lang = MultilingualUI.GetDefaultLanguage();
                }
            }
            new MultilingualUI().SetLanguage(lang);
        }

        public void OnActionExecuted(ActionExecutedContext filterContext)
        {
            /* timer.Stop();
             filterContext.HttpContext.Response.Write(
                 string.Format("<div>Action method elapsed time: {0}<br />User Culture: {1}</div>", timer.Elapsed.TotalMilliseconds, lng));  */
        }
    }
}