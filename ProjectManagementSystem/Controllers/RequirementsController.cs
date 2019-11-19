using System.Collections.Generic;
using System.Linq;
using ProjectManagementSystem.Models;
using SqlEntities = ProjectManagementSystem.Sql.Entities;

namespace ProjectManagementSystem.Controllers
{
    public class RequirementsController : BaseController
    {
        public IEnumerable<Requirement> Get() =>
            GetDbContext().Select<SqlEntities.Requirement>().Select(Requirement.FromDbEntity);
        public Requirement Get(int requirementId) => Get().FirstOrDefault(r => r.Id == requirementId);
        public IEnumerable<Requirement> GetForProject(int projectId) => Get().Where(r => r.ProjectId == projectId);
    }
}