package taskflow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import taskflow.entity.Project;
import taskflow.service.ProjectService;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    // Listens for a POST request to create a new project
    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectService.saveProject(project);
    }

    // Listens for a GET request to fetch all projects
    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }
}