using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using ProjectManagementSystem.Sql;
using SqlEntities = ProjectManagementSystem.Sql.Entities;

namespace ProjectManagementSystem.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public User Manager { get; set; }
        public bool Deleted { get; set; }
        public List<User> TeamMembers { get; set; }
        public List<Requirement> Requirements { get; set; }

        public static Project FromDbEntity(SqlEntities.Project sqlProject)
        {
            if (sqlProject == null)
                return null;
            
            var dbContext = new ProjectManagementContext();

            var users = dbContext.Select<SqlEntities.User>();
            
            var manager = User.FromDbEntity(users.First(u => u.Id == sqlProject.Manager));

            var members = dbContext.Select<SqlEntities.TeamMember>().Where(m => m.ProjectId == sqlProject.Id);
            var memberUsers = users.Where(u => members.Any(x => x.UserId == u.Id)).Select(User.FromDbEntity);
            var requirements = dbContext.Select<SqlEntities.Requirement>().Where(r => r.ProjectId == sqlProject.Id)
                .Select(Requirement.FromDbEntity);

            return new Project
            {
                Id = sqlProject.Id,
                Title = sqlProject.Title,
                Description = sqlProject.Description,
                Created = sqlProject.Created,
                Manager = manager,
                Deleted = sqlProject.Deleted == 1,
                TeamMembers = memberUsers.ToList(),
                Requirements = requirements.ToList()
            };
        }
    }
}