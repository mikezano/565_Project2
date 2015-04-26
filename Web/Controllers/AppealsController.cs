using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Web.Models;
using Newtonsoft.Json;

namespace Web.Controllers
{
    public class AppealsController : ApiController
    {
        public static Appeal appeal { get; set; }

        // GET api/<controller>/5
        public HttpResponseMessage Get(int id)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new ObjectContent(typeof(Appeal), id == 2 ? AppealsController.appeal : null, new AppealFormatter());
            //Assume a database call happens
            return response;
        }
        public HttpResponseMessage Post(Appeal appeal)
        {
            //the equivalent to saving it to a database
            AppealsController.appeal = appeal;

            //updating properties
            AppealsController.appeal.Id = 2;
            AppealsController.appeal.ActionUri = "api/Appeals";

            //creating the 'application/vnd.cse564-appeals+xml' response
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new ObjectContent(appeal.GetType(), AppealsController.appeal, new AppealFormatter());

            //return created object
            return response;
        }
        public HttpResponseMessage Put(Appeal appeal)
        {
            AppealsController.appeal = appeal;
            AppealsController.appeal.ActionUri = "api/Appeals";

            //creating the 'application/vnd.cse564-appeals+xml' response
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new ObjectContent(appeal.GetType(), AppealsController.appeal, new AppealFormatter());

            return response;
        }
        [HttpDelete]
        public void Delete(int id)
        {
            /* 
             * Remove from database
             * db.Delete(appeal)
             */
            //no need to return anything
            return;
        }
    }
}