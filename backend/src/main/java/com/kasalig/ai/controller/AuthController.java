package com.kasalig.ai.controller;

import com.kasalig.ai.dto.LoginRequest;
import com.kasalig.ai.dto.RegisterRequest;
import com.kasalig.ai.model.User;
import com.kasalig.ai.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User user = userService.register(
                    request.getFullName(),
                    request.getEmail(),
                    request.getPassword()
            );
            return ResponseEntity.ok(Map.of(
                    "id", user.getId(),
                    "fullName", user.getFullName(),
                    "email", user.getEmail(),
                    "message", "Registration successful"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User user = userService.login(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(Map.of(
                    "id", user.getId(),
                    "fullName", user.getFullName(),
                    "email", user.getEmail(),
                    "message", "Login successful"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/me/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Long id) {
        return userService.findById(id)
                .map(user -> ResponseEntity.ok(Map.of(
                        "id", user.getId(),
                        "fullName", user.getFullName(),
                        "email", user.getEmail()
                )))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/me/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody Map<String, String> updates) {
        try {
            User user = userService.updateUser(id, updates.get("fullName"), updates.get("email"));
            return ResponseEntity.ok(Map.of(
                    "id", user.getId(),
                    "fullName", user.getFullName(),
                    "email", user.getEmail(),
                    "message", "Profile updated"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
