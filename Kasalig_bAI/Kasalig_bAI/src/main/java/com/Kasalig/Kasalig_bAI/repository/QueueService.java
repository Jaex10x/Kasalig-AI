package com.Kasalig.Kasalig_bAI.repository;

import com.Kasalig.Kasalig_bAI.repository.*;
import java.util.List;

public interface QueueService {
    QueueResponse createQueue(QueueRequest request);
    List<QueueResponse> getAllQueues();
    List<QueueResponse> getQueuesByStatus(String status);
    List<QueueResponse> getQueuesByUserId(String userId);
    QueueResponse getQueueById(Long id);
    QueueResponse updateStatus(Long id, String status);
    void deleteQueue(Long id);
}