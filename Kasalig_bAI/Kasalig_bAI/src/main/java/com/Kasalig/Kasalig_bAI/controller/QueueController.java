package com.Kasalig.Kasalig_bAI.controller;

import com.Kasalig.Kasalig_bAI.dto.QueueRequest;
import com.Kasalig.Kasalig_bAI.dto.QueueResponse;
import com.Kasalig.Kasalig_bAI.service.QueueService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/queue")
@CrossOrigin(origins = "*")
public class QueueController {

    private final QueueService queueService;

    // Constructor injection
    public QueueController(QueueService queueService) {
        this.queueService = queueService;
    }

    // 1. Create / Join a queue
    @PostMapping
    public ResponseEntity<QueueResponse> createQueue(@Valid @RequestBody QueueRequest request) {
        QueueResponse response = queueService.createQueue(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 2. Get all queues (with optional status filter e.g., ?status=WAITING)
    @GetMapping
    public ResponseEntity<List<QueueResponse>> getAllQueues(
            @RequestParam(required = false) String status) {
        List<QueueResponse> queues = (status != null) 
                ? queueService.getQueuesByStatus(status) 
                : queueService.getAllQueues();
        return ResponseEntity.ok(queues);
    }

    // 3. Get specific queue ticket by ID
    @GetMapping("/{queueId}")
    public ResponseEntity<QueueResponse> getQueueById(@PathVariable Long queueId) {
        QueueResponse response = queueService.getQueueById(queueId);
        return ResponseEntity.ok(response);
    }

    // 4. Update queue status (e.g., WAITING, SERVING, COMPLETED, CANCELLED)
    @PutMapping("/{queueId}/status")
    public ResponseEntity<QueueResponse> updateQueueStatus(
            @PathVariable Long queueId,
            @RequestParam String status) {
        QueueResponse response = queueService.updateStatus(queueId, status);
        return ResponseEntity.ok(response);
    }

    // 5. Delete or cancel a queue ticket
    @DeleteMapping("/{queueId}")
    public ResponseEntity<Void> cancelQueue(@PathVariable Long queueId) {
        queueService.deleteQueue(queueId);
        return ResponseEntity.noContent().build();
    }
}
