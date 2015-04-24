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
        public Appeal Get(int id)
        {
            //Assume a database call happens
            return id == 2 ? AppealsController.appeal : null;
        }
        public Appeal Post(Appeal appeal)
        {
            //the equivalent to saving it to a database
            AppealsController.appeal = appeal;

            //updating properties
            AppealsController.appeal.Id = 2;
            AppealsController.appeal.ActionUri = "api/Appeals/";

            //return created object
            return AppealsController.appeal;
        }
        public Appeal Put(Appeal appeal)
        {
            AppealsController.appeal = appeal;
            AppealsController.appeal.ActionUri = "api/Appeals/";
            return AppealsController.appeal;
        }
        public void Delete(Appeal appeal)
        {
            /* 
             * Remove from database
             * db.Delete(appeal)
             */
            //no need to return anything
        }
    }
}