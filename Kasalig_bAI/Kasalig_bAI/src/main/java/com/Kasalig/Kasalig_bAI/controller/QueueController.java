package com.Kasalig.Kasalig_bAI.controller;

import com.Kasalig.Kasalig_bAI.repository.*;
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

    public QueueController(QueueService queueService) {
        this.queueService = queueService;
    }

    // 1. Create / Join a queue
    // URLs: POST http://localhost:8080/api/queue  OR  POST http://localhost:8080/api/queue/create
    @PostMapping({"", "/create"})
    public ResponseEntity<QueueResponse> createQueue(@Valid @RequestBody QueueRequest request) {
        QueueResponse response = queueService.createQueue(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 2. Get all queues (with optional status or userId filter e.g., ?status=WAITING or ?userId=xyz)
    // URLs: GET http://localhost:8080/api/queue  OR  GET http://localhost:8080/api/queue/all
    @GetMapping({"", "/all"})
    public ResponseEntity<List<QueueResponse>> getAllQueues(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String userId) {
        if (userId != null && !userId.isBlank()) {
            return ResponseEntity.ok(queueService.getQueuesByUserId(userId));
        }
        List<QueueResponse> queues = (status != null)
                ? queueService.getQueuesByStatus(status)
                : queueService.getAllQueues();
        return ResponseEntity.ok(queues);
    }

    // 2b. Get queues for a specific user: GET http://localhost:8080/api/queue/user/{userId}
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<QueueResponse>> getQueuesByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(queueService.getQueuesByUserId(userId));
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