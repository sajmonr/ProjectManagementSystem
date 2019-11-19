using SqlEntities = ProjectManagementSystem.Sql.Entities;

namespace ProjectManagementSystem.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public static User FromDbEntity(SqlEntities.User sqlUser)
        {
            return new User
            {
                Id = sqlUser.Id,
                FirstName = sqlUser.FirstName,
                LastName = sqlUser.LastName
            };
        }
    }
}