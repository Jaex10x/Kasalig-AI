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

    /**
     * Sync a Supabase Auth user to the local users table.
     * Creates a new record if not found, or updates the existing one.
     */
    public User syncFromSupabase(String supabaseAuthId, String fullName, String email) {
        // Try to find existing user by Supabase Auth ID
        Optional<User> existing = userRepository.findBySupabaseAuthId(supabaseAuthId);
        if (existing.isPresent()) {
            // Update name/email if changed
            User user = existing.get();
            if (fullName != null) user.setFullName(fullName);
            if (email != null) user.setEmail(email);
            return userRepository.save(user);
        }

        // Check if a user with this email already exists (migrating existing user)
        Optional<User> byEmail = userRepository.findByEmail(email);
        if (byEmail.isPresent()) {
            User user = byEmail.get();
            user.setSupabaseAuthId(supabaseAuthId);
            if (fullName != null) user.setFullName(fullName);
            return userRepository.save(user);
        }

        // Create new user linked to Supabase Auth
        User newUser = new User(supabaseAuthId, fullName, email);
        return userRepository.save(newUser);
    }
}
