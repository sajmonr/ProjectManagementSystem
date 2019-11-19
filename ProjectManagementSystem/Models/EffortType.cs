using SqlEntities = ProjectManagementSystem.Sql.Entities;

namespace ProjectManagementSystem.Models
{
    public class EffortType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public static EffortType FromDbEntity(SqlEntities.EffortType sqlEffort)
        {
            return new EffortType
            {
                Id = sqlEffort.Id,
                Name = sqlEffort.Name
            };
        }
    }
}