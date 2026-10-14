package com.Kasalig.Kasalig_bAI.controller;

import com.Kasalig.Kasalig_bAI.dto.QueueRequest;
import com.Kasalig.Kasalig_bAI.dto.QueueResponse;
import com.Kasalig.Kasalig_bAI.service.QueueService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/queue")
@CrossOrigin("*")
public class QueueController {

    private final QueueService queueService;

    public QueueController(QueueService queueService) {
        this.queueService = queueService;
    }

    @PostMapping
    public ResponseEntity<QueueResponse> createQueue(@RequestBody QueueRequest request) {
        QueueResponse response = queueService.createQueue(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<QueueResponse>> getAllQueues() {
        List<QueueResponse> queues = queueService.getAllQueues();
        return ResponseEntity.ok(queues);
    }

    @GetMapping("/{queueId}")
    public ResponseEntity<QueueResponse> getQueueById(@PathVariable Long queueId) {
        QueueResponse response = queueService.getQueueById(queueId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{queueId}/status")
    public ResponseEntity<QueueResponse> updateQueueStatus(
            @PathVariable Long queueId,
            @RequestParam String status) {
        QueueResponse response = queueService.updateStatus(queueId, status);
        return ResponseEntity.ok(response);
    }
}
