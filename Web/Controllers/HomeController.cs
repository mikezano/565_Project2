using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Text;
using System.Net;
using System.Net.Mime;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Mvc;
using Web.Models;

namespace Web.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public JsonResult GetGrade(int id)
        {
            var result = new{ 
                Grade = new Grade() { Comments = "Try Harder", Letter = "C-" },
                ActionUri = "api/Appeals/"
        };
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}