package taskflow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import taskflow.entity.Task;
import taskflow.service.TaskService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/tasks") // <-- CHANGED FROM /api/auth TO /api/tasks
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Create
    @PostMapping
    public Task createTask(@RequestBody Task task , Principal principal) {
        return taskService.saveTask(task);
    }

    // Read All
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // Read by Project
    @GetMapping("/project/{projectId}")
    public List<Task> getTasksByProject(@PathVariable Long projectId) {
        return taskService.getTasksByProjectId(projectId);
    }

    // Update
    @PutMapping("/{id}")
    public Task updateTaskStatus(@PathVariable Long id, @RequestBody Task updatedTask) {
        return taskService.updateTask(id, updatedTask);
    }

    // Delete
    @DeleteMapping("/{taskId}")
    public String deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return "Task deleted successfully!";
    }
}