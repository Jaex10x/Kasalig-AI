package com.kasalig.ai.service;

import com.kasalig.ai.model.Application;
import com.kasalig.ai.repository.ApplicationRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    public List<Application> getApplicationsByUserId(Long userId) {
        return applicationRepository.findByUserId(userId);
    }

    public Optional<Application> getApplicationById(String id) {
        return applicationRepository.findById(id);
    }
}
