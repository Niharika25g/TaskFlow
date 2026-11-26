package taskflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import taskflow.entity.Task;

import java.util.List; // Added this import

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    // Spring Boot will magically write the SQL for this based purely on the method name!
    List<Task> findByProjectId(Long projectId);
    
}