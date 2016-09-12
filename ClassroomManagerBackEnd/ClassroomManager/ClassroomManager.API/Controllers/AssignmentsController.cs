using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ClassroomManager.API.Infrastructure;
using ClassroomManager.API.Models;

namespace ClassroomManager.API.Controllers
{
    public class AssignmentsController : ApiController
    {
        private ClassroomDataContext db = new ClassroomDataContext();

        // GET: api/Assignments
        public IQueryable<Assignment> GetAssignments()
        {
            return db.Assignments;
        }

        // GET: api/Assignments/5/4
        [ResponseType(typeof(Assignment))]
        [HttpGet, Route("api/assignments/{studentId}/{projectId}")]
        public IHttpActionResult GetAssignment(int studentId, int projectId)
        {
            //Assignment assignment = db.Assignments.Find(id);
            var assignment = db.Assignments.Where(a => a.StudentID == studentId && a.ProjectID == projectId);

            if (assignment == null)
            {
                return NotFound();
            }

            return Ok(assignment);
        }

        // PUT: api/Assignments/5
        [ResponseType(typeof(void))]
        [HttpPut, Route("api/assignments/{studentId}/{projectId}")]
        public IHttpActionResult PutAssignment(int studentId, int projectId, Assignment assignment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (studentId != assignment.StudentID || projectId != assignment.ProjectID)
            {
                return BadRequest();
            }

            //var assignmentToBeUpdated = db.Assignments.Find(id);
            var assignmentToBeUpdated = db.Assignments.FirstOrDefault(a => a.StudentID == studentId && a.ProjectID == projectId);

            db.Entry(assignmentToBeUpdated).CurrentValues.SetValues(assignment);
            db.Entry(assignmentToBeUpdated).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssignmentExists(studentId, projectId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Assignments
        [ResponseType(typeof(Assignment))]
        public IHttpActionResult PostAssignment(Assignment assignment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Assignments.Add(assignment);

            try
            {
                db.SaveChanges();
            }

            catch (DbUpdateException)
            {
                if (AssignmentExists(assignment.StudentID, assignment.ProjectID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = assignment.StudentID }, assignment);
        }

        // DELETE: api/Assignments/5
        [ResponseType(typeof(Assignment))]
        [HttpDelete, Route("api/assignments/{studentId}/{projectId}")]
        public IHttpActionResult DeleteAssignment(int studentId, int projectId)
        {
            Assignment assignment = db.Assignments.Find(studentId, projectId);
            if (assignment == null)
            {
                return NotFound();
            }

            db.Assignments.Remove(assignment);
            db.SaveChanges();

            return Ok(assignment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AssignmentExists(int studentId, int projectId)
        {
            return db.Assignments.Count(e => e.StudentID == studentId && e.ProjectID == projectId) > 0;
        }
    }
}