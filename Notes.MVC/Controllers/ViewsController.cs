using Notes.MVC.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Notes.MVC.Controllers
{
    [MUI]
    public class ViewsController : Controller
    {
        // GET: /Views/Edit
        public ActionResult Edit()
        {
            return View();
        }

        // GET: /Views/List
        public ActionResult List()
        {
            return View();
        }

        // GET: /Views/Login
        public ActionResult Login()
        {
            return View();
        }

        // GET: /Views/Logs
        public ActionResult Logs()
        {
            return View();
        }

        // GET: /Views/Task
        public ActionResult Task()
        {
            return View();
        }
    }
}