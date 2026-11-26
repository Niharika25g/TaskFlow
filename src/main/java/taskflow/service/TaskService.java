package taskflow.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import taskflow.entity.Task;
import taskflow.repository.TaskRepository;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Method to create a new task
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    // Method to fetch all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // NEW: Method to fetch tasks for a specific project
    public List<Task> getTasksByProjectId(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }
    // NEW: Method to update a task's status
    public Task updateTaskStatus(Long taskId, Task.Status newStatus) {
        // 1. Find the existing task in the database
        Task existingTask = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
        
        // 2. Change the status
        existingTask.setStatus(newStatus);
        
        // 3. Save the updated task back to the database
        return taskRepository.save(existingTask);
    }
    // NEW: Method to delete a task
    public void deleteTask(Long taskId) {
        // 1. Check if the task actually exists first
        if (!taskRepository.existsById(taskId)) {
            throw new RuntimeException("Cannot delete: Task not found with id: " + taskId);
        }
        
        // 2. Delete it from the database
        taskRepository.deleteById(taskId);
    }
   public Task updateTask(Long id, Task updatedTaskDetails) {
    Task existingTask = taskRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    
    existingTask.setTitle(updatedTaskDetails.getTitle());
    existingTask.setDescription(updatedTaskDetails.getDescription());
    existingTask.setStatus(updatedTaskDetails.getStatus());
    
    return taskRepository.save(existingTask);
}
}