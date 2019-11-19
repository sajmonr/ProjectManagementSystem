using Microsoft.AspNetCore.Mvc;
using ProjectManagementSystem.Sql;

namespace ProjectManagementSystem.Controllers
{
    [Route("api/[controller]/[action]")]
    public class BaseController : Controller
    {
        public ProjectManagementContext GetDbContext() => HttpContext.RequestServices.GetService(typeof(ProjectManagementContext)) as ProjectManagementContext;
    }
}