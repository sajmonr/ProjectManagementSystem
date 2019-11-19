using System;
using System.Linq;
using ProjectManagementSystem.Sql;
using  SqlEntities = ProjectManagementSystem.Sql.Entities;

namespace ProjectManagementSystem.Models
{
    public class Effort
    {
        public int Id { get; set; }
        public int RequirementId { get; set; }
        public EffortType Type { get; set; }
        public EffortFrequency Frequency { get; set; }
        public int Hours { get; set; }
        public DateTime Added { get; set; }

        public static Effort FromDbEntity(SqlEntities.Effort sqlEffort)
        {
            var dbContext = new ProjectManagementContext();

            var types = dbContext.Select<SqlEntities.EffortType>();
            var thisType = EffortType.FromDbEntity(types.First(t => t.Id == sqlEffort.TypeId));
            
            return new Effort
            {
                Id = sqlEffort.Id,
                RequirementId = sqlEffort.RequirementId,
                Type = thisType,
                Frequency = (EffortFrequency)sqlEffort.Frequency,
                Hours = sqlEffort.Hours,
                Added = sqlEffort.Added
            };
        }
    }
}