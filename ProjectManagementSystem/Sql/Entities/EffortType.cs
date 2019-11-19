using ProjectManagementSystem.Sql.Attributes;

namespace ProjectManagementSystem.Sql.Entities
{
    [Table("efforttypes")]
    public class EffortType : Table
    {
        [PrimaryKey]
        public int Id { get; set; }

        public string Name { get; set; }
    }
}