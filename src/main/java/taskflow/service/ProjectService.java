package taskflow.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import taskflow.entity.Project;
import taskflow.repository.ProjectRepository;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    // Method to create a new project
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    // Method to fetch all projects
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
}