using System.Collections.Generic;
using System.Linq;
using ProjectManagementSystem.Models;
using ProjectManagementSystem.Sql;
using SqlEntity = ProjectManagementSystem.Sql.Entities;

namespace ProjectManagementSystem.Controllers
{
    public class EffortsController : BaseController
    {
        private readonly ProjectManagementContext _dbContext;

        public EffortsController(ProjectManagementContext projectManagementContext)
        {
            _dbContext = projectManagementContext;
        }

        public IEnumerable<EffortType> GetTypes() => _dbContext.Select<SqlEntity.EffortType>().Select(EffortType.FromDbEntity);
    }
}