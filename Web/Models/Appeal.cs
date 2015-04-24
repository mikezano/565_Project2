using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class Appeal
    {
        public int Id { get; set; }
        public Grade Grade { get; set; }
        public string Title { get; set; }
        public string[] Comments { get; set; }
        public string State { get; set; }
        public string ActionUri { get; set; }


        public void Approve(){
            this.State = "Approved";
        }
    }

}