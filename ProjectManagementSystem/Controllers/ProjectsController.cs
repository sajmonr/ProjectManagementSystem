using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using ProjectManagementSystem.Models;
using ProjectManagementSystem.Sql;
using SqlEntities = ProjectManagementSystem.Sql.Entities;

namespace ProjectManagementSystem.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ProjectsController : Controller
    {
        private readonly ProjectManagementContext _projectContext;
        public ProjectsController(ProjectManagementContext projectContext)
        {
            _projectContext = projectContext;
        }

        public IEnumerable<Project> GetAll() => _projectContext.Select<SqlEntities.Project>().Where(p => p.Deleted != 1).Select(Project.FromDbEntity);
        public Project GetById(int id) => GetAll().FirstOrDefault(p => p.Id == id);
        [HttpPost]
        public Project Save([FromBody] Project project)
        {
            if (project == null) 
                return null;

            if (_projectContext.Select<SqlEntities.Project>().FirstOrDefault(p => p.Id == project.Id) == null)
            {
                project.Id = CreateProject(project);
            }
            else
                UpdateProject(project);
            
            return Project.FromDbEntity(_projectContext.Select<SqlEntities.Project>().FirstOrDefault(p => p.Id == project.Id));
        }

        public void Delete(int projectId)
        {
            var sqlProject = _projectContext.Select<SqlEntities.Project>().FirstOrDefault(p => p.Id == projectId);
            if (sqlProject != null)
            {
                sqlProject.Deleted = 1;
                _projectContext.Update(sqlProject);
            }
        }
        private int CreateProject(Project project)
        {
            var sqlProject = SqlEntities.Project.FromModel(project);
            
            sqlProject.Created = DateTime.Now;

            int projectId = _projectContext.Insert(sqlProject);
            
            UpdateTeamMembers(projectId, project.TeamMembers);
            UpdateRequirement(projectId, project.Requirements);
            UpdateEfforts(project.Requirements, project.Requirements.Select(r => r.Efforts));
            
            return projectId;
        }
        private void UpdateProject(Project project)
        {
            var sqlProject = SqlEntities.Project.FromModel(project);
            
            _projectContext.Update(sqlProject);
            //Update team members
            UpdateTeamMembers(project.Id, project.TeamMembers);
            UpdateRequirement(project.Id, project.Requirements);
            UpdateEfforts(project.Requirements, project.Requirements.Select(r => r.Efforts));
        }

        private void UpdateTeamMembers(int projectId, IEnumerable<User> newMembers)
        {
            var currentMembers = _projectContext.Select<SqlEntities.TeamMember>().Where(m => m.ProjectId == projectId);
            var membersToInsert = newMembers.Where(m => currentMembers.All(cm => cm.Id != m.Id));
            var membersToDelete = currentMembers.Where(m => newMembers.All(cm => cm.Id != m.Id));

            foreach (var member in membersToInsert)
                _projectContext.Insert(new SqlEntities.TeamMember
                {
                    ProjectId = projectId,
                    UserId = member.Id
                });
            
            foreach(var member in membersToDelete)
                _projectContext.Delete(member);
        }
        
        private void UpdateRequirement(int projectId, IEnumerable<Requirement> newRequirements)
        {
            var currentRequirements = _projectContext.Select<SqlEntities.Requirement>().Where(m => m.ProjectId == projectId);
            
            var requirementsToInsert = newRequirements.Where(m => currentRequirements.All(cm => cm.Id != m.Id));
            var requirementsToDelete = currentRequirements.Where(m => newRequirements.All(cm => cm.Id != m.Id));
            var requirementsToUpdate = newRequirements.Where(r => r.Id > 0);

            foreach (var requirement in requirementsToUpdate)
                _projectContext.Update(SqlEntities.Requirement.FromModel(requirement));
            
            foreach (var requirement in requirementsToInsert)
                _projectContext.Insert(SqlEntities.Requirement.FromModel(requirement));
            
            foreach(var member in requirementsToDelete)
                _projectContext.Delete(member);
        }

        private void UpdateEfforts(IEnumerable<Requirement> requirements, IEnumerable<IEnumerable<Effort>> newEfforts)
        {
            var arrRequirements = requirements.ToArray();
            var arrNewEfforts = newEfforts.ToArray();
            
            if (arrRequirements.Length != arrNewEfforts.Length)
                return;

            for(int i = 0; i < arrRequirements.Length; i++)
                UpdateEfforts(arrRequirements[i].Id, arrNewEfforts[i]);

        }
        private void UpdateEfforts(int requirementId, IEnumerable<Effort> newEfforts)
        {
            var currentEfforts = _projectContext.Select<SqlEntities.Effort>().Where(e => e.RequirementId == requirementId);
            var effortsToInsert = newEfforts.Where(e => currentEfforts.All(ce => ce.Id != e.Id));
            var effortsToDelete = currentEfforts.Where(e => newEfforts.All(ce => ce.Id != e.Id));

            foreach (var effort in effortsToInsert)
                _projectContext.Insert(SqlEntities.Effort.FromModel(effort));
            foreach (var effort in effortsToDelete)
                _projectContext.Delete(effort);

        }
    }
}