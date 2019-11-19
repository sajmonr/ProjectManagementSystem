using System;
using ProjectManagementSystem.Sql.Attributes;
using Models = ProjectManagementSystem.Models;

namespace ProjectManagementSystem.Sql.Entities
{
    [Table("projects")]
    public class Project : Table
    {
        [PrimaryKey]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public int Manager { get; set; }
        public int Deleted { get; set; }

        public static Project FromModel(Models.Project project)
        {
            return new Project
            {
                Id = project.Id,
                Title = project.Title,
                Description = project.Description,
                Created = project.Created,
                Manager = project.Manager.Id,
                Deleted = project.Deleted ? 1 : 0
            };
        }
    }
}