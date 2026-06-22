package com.kasalig.ai.service;

import com.kasalig.ai.model.User;
import com.kasalig.ai.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(String fullName, String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already registered");
        }
        // In production, hash password with BCrypt. For now, store as-is for simplicity.
        // TODO: Add BCrypt dependency and use passwordEncoder.encode(password)
        User user = new User(fullName, email, password);
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        User user = userOpt.get();
        // Simple password check (in production, use BCrypt matches)
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }
        return user;
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User updateUser(Long id, String fullName, String email) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (fullName != null) user.setFullName(fullName);
        if (email != null) user.setEmail(email);
        return userRepository.save(user);
    }
}
