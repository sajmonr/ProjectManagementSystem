using ProjectManagementSystem.Sql.Attributes;

namespace ProjectManagementSystem.Sql.Entities
{
    [Table("users")]
    public class User : Table
    {
        [PrimaryKey]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}