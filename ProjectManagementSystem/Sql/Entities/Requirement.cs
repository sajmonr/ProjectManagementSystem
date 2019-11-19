using System;
using ProjectManagementSystem.Sql.Attributes;

namespace ProjectManagementSystem.Sql.Entities
{
    [Table("requirements")]
    public class Requirement : Table
    {
        [PrimaryKey]
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public int Type { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }

        public static Requirement FromModel(Models.Requirement requirement)
        {
            return new Requirement
            {
                Id = requirement.Id,
                ProjectId = requirement.ProjectId,
                Type = (int)requirement.Type,
                Description = requirement.Description,
                Created = requirement.Created
            };
        }
        
    }
}