using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClassroomManager.API.Models
{
    public class Assignment
    {
        public int StudentID { get; set; }
        public int ProjectID { get; set; }

        public string Grade { get; set; }

        public virtual Student Student { get; set; }
        public virtual Project Project { get; set; }
    }
}