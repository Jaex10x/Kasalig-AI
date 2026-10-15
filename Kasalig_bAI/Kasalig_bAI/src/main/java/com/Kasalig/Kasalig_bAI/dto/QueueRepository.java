package com.Kasalig.Kasalig_bAI.repository;

import com.Kasalig.Kasalig_bAI.model.Queue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QueueRepository extends JpaRepository<Queue, Long> {
    List<Queue> findByStatus(String status);
}

