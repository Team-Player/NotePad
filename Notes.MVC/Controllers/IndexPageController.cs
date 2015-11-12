using Notes.MVC.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Notes.MVC.Controllers
{
    [MUI]
    public class IndexPageController : Controller
    {
        public ActionResult Home()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
