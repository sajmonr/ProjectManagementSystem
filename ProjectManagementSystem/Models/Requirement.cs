using System;
using System.Collections.Generic;
using System.Linq;
using ProjectManagementSystem.Sql;
using SqlEntity = ProjectManagementSystem.Sql.Entities;

namespace ProjectManagementSystem.Models
{
    public enum RequirementType{ NonFunctional, Functional }
    public class Requirement
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public RequirementType Type { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public List<Effort> Efforts { get; set; }

        public static Requirement FromDbEntity(SqlEntity.Requirement sqlRequirement)
        {
            var dbContext = new ProjectManagementContext();

            var efforts = dbContext.Select<SqlEntity.Effort>().Where(e => e.RequirementId == sqlRequirement.Id).Select(Effort.FromDbEntity);
            
            return new Requirement
            {
                Id = sqlRequirement.Id,
                ProjectId = sqlRequirement.ProjectId,
                Type = (RequirementType) sqlRequirement.Type,
                Description = sqlRequirement.Description,
                Created = sqlRequirement.Created,
                Efforts = efforts.ToList()
            };
        }
        
    }
}