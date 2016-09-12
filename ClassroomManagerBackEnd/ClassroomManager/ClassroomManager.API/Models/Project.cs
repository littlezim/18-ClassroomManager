using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClassroomManager.API.Models
{
    public class Project
    {
        public int ProjectID { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Assignment> Assignments { get; set; }
    }
}