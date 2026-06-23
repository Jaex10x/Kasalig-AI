package com.kasalig.ai.repository;

import com.kasalig.ai.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findBySupabaseAuthId(String supabaseAuthId);
    boolean existsByEmail(String email);
}
