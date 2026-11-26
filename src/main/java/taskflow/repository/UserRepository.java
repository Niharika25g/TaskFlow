package taskflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import taskflow.entity.User;
import java.util.Optional; // NEW

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // NEW: Spring Boot will automatically write the SQL to search by email!
    Optional<User> findByEmail(String email);
    
}