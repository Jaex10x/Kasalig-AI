package com.kasalig.ai.repository;

import com.kasalig.ai.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, String> {
    List<Application> findByUserId(Long userId);
}
