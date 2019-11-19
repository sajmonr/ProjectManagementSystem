using ProjectManagementSystem.Sql.Attributes;

namespace ProjectManagementSystem.Sql.Entities
{
    [Table("teammembers")]
    public class TeamMember : Table
    {
        [PrimaryKey]
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public int UserId { get; set; }
    }
}