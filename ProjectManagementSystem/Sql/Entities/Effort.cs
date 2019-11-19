using System;
using ProjectManagementSystem.Sql.Attributes;

namespace ProjectManagementSystem.Sql.Entities
{
    [Table("efforts")]
    public class Effort : Table
    {
        [PrimaryKey]
        public int Id { get; set; }
        public int RequirementId { get; set; }
        public int TypeId { get; set; }
        public int Frequency { get; set; }
        public int Hours { get; set; }
        public DateTime Added { get; set; }

        public static Effort FromModel(Models.Effort effort)
        {
            return new Effort
            {
                Id = effort.Id,
                RequirementId = effort.RequirementId,
                TypeId = effort.Type.Id,
                Frequency = (int)effort.Frequency,
                Hours = effort.Hours,
                Added = effort.Added
            };
        }
        
    }
}