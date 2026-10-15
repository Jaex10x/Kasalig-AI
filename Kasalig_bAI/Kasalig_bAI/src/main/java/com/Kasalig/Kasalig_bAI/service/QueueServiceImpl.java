package com.Kasalig.Kasalig_bAI.service;

import com.Kasalig.Kasalig_bAI.repository.*;
import com.Kasalig.Kasalig_bAI.model.Queue;
import com.Kasalig.Kasalig_bAI.dto.QueueRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;

@Service
public class QueueServiceImpl implements QueueService {

    private static final Set<String> VALID_STATUSES =
            Set.of("WAITING", "SERVING", "COMPLETED", "CANCELLED");

    private final QueueRepository queueRepository;

    public QueueServiceImpl(QueueRepository queueRepository) {
        this.queueRepository = queueRepository;
    }

    @Override
    public QueueResponse createQueue(QueueRequest request) {
        Queue queue = new Queue();
        queue.setUserId(request.getUser_id() != null ? request.getUser_id() : request.getUserId());
        queue.setFullName(request.getFull_name());
        queue.setEmail(request.getEmail());
        queue.setContactNumber(request.getContact_number());
        queue.setServiceType(request.getService_type());
        queue.setLocationType(request.getLocation_type());
        queue.setLocationName(request.getLocation_name());
        queue.setDate(request.getDate());
        queue.setTime(request.getTime());
        queue.setAdditionalDetails(request.getAdditional_details());
        return toResponse(queueRepository.save(queue));
    }

    @Override
    public List<QueueResponse> getAllQueues() {
        return queueRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Override
    public List<QueueResponse> getQueuesByStatus(String status) {
        return queueRepository.findByStatus(validateStatus(status))
                .stream().map(this::toResponse).toList();
    }

    @Override
    public List<QueueResponse> getQueuesByUserId(String userId) {
        return queueRepository.findByUserId(userId)
                .stream().map(this::toResponse).toList();
    }

    @Override
    public QueueResponse getQueueById(Long id) {
        return toResponse(findOrThrow(id));
    }

    @Override
    public QueueResponse updateStatus(Long id, String status) {
        Queue queue = findOrThrow(id);
        queue.setStatus(validateStatus(status));
        return toResponse(queueRepository.save(queue));
    }

    @Override
    public void deleteQueue(Long id) {
        queueRepository.delete(findOrThrow(id));
    }

    // ---- helpers ----

    private Queue findOrThrow(Long id) {
        return queueRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Queue not found: " + id));
    }

    private String validateStatus(String status) {
        String normalized = status.toUpperCase();
        if (!VALID_STATUSES.contains(normalized)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid status: " + status + ". Allowed: " + VALID_STATUSES);
        }
        return normalized;
    }

    private QueueResponse toResponse(Queue q) {
        QueueResponse r = new QueueResponse();
        r.setQueueId(q.getQueueId());
        r.setUser_id(q.getUserId());
        r.setFull_name(q.getFullName());
        r.setEmail(q.getEmail());
        r.setContact_number(q.getContactNumber());
        r.setService_type(q.getServiceType());
        r.setLocation_type(q.getLocationType());
        r.setLocation_name(q.getLocationName());
        r.setDate(q.getDate());
        r.setTime(q.getTime());
        r.setAdditional_details(q.getAdditionalDetails());
        r.setStatus(q.getStatus());
        r.setAssigned_to_hall(q.getAssignedToHall());
        return r;
    }
}