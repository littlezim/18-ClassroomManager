using ClassroomManager.API.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ClassroomManager.API.Infrastructure
{
    public class ClassroomDataContext : DbContext
    {
        public ClassroomDataContext() : base("Classroom")
        {

        }

        public IDbSet<Assignment> Assignments { get; set; }
        public IDbSet<Project> Projects { get; set; }
        public IDbSet<Student> Students { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // Compound Key
            modelBuilder.Entity<Assignment>()
                        .HasKey(a => new { a.StudentID, a.ProjectID });

            // A Project Has Many Assignments
            modelBuilder.Entity<Project>()
                        .HasMany(p => p.Assignments)
                        .WithRequired(a => a.Project)
                        .HasForeignKey(a => a.ProjectID);

            // A Student Has Many Assignments
            modelBuilder.Entity<Student>()
                        .HasMany(s => s.Assignments)
                        .WithRequired(a => a.Student)
                        .HasForeignKey(a => a.StudentID);
        }
    }
}