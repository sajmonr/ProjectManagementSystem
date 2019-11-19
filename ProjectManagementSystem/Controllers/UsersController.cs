using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProjectManagementSystem.Models;
using SqlEntities = ProjectManagementSystem.Sql.Entities;

namespace ProjectManagementSystem.Controllers
{
    public class UsersController : BaseController
    {
        public IEnumerable<User> GetAll() => GetDbContext().Select<SqlEntities.User>().Select(Models.User.FromDbEntity);
        public User GetById(int id) => GetAll().FirstOrDefault(u => u.Id == id);
        [HttpPost]
        public User Save([FromBody] User user)
        {
            if (user == null)
                return null;

            var sqlUser = GetDbContext().Select<SqlEntities.User>().FirstOrDefault(u => u.Id == user.Id) ??
                          new SqlEntities.User();

            sqlUser.FirstName = user.FirstName;
            sqlUser.LastName = user.LastName;
            
            if(user.Id > 0)
                GetDbContext().Update(sqlUser);
            else
            {
                int id = GetDbContext().Insert(sqlUser);
                user = GetById(id);
            }


            return user;
        }
    }
}