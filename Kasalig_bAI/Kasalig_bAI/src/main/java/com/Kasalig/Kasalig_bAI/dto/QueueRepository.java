package com.Kasalig.Kasalig_bAI.dto;

import com.Kasalig.Kasalig_bAI.model.Queue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QueueRepository extends JpaRepository<Queue, Long> {
    List<Queue> findByStatus(String status);
    List<Queue> findByUserId(String userId);
    List<Queue> findByUserIdAndStatus(String userId, String status);
}
