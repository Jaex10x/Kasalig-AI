package com.kasalig.ai.controller;

import com.kasalig.ai.dto.ChatRequest;
import com.kasalig.ai.model.ChatMessage;
import com.kasalig.ai.model.User;
import com.kasalig.ai.repository.ChatMessageRepository;
import com.kasalig.ai.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;

    public ChatController(ChatMessageRepository chatMessageRepository, UserRepository userRepository) {
        this.chatMessageRepository = chatMessageRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<ChatMessage>> getChatHistory(@PathVariable Long userId) {
        List<ChatMessage> messages = chatMessageRepository.findByUserIdOrderByTimestampAsc(userId);
        return ResponseEntity.ok(messages);
    }

    @PostMapping
    public ResponseEntity<?> saveMessage(@RequestBody ChatRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElse(null);

        ChatMessage message = new ChatMessage();
        message.setUser(user);
        message.setSender(request.getSender());
        message.setContent(request.getContent());

        ChatMessage saved = chatMessageRepository.save(message);
        return ResponseEntity.ok(Map.of(
                "id", saved.getId(),
                "sender", saved.getSender(),
                "content", saved.getContent(),
                "timestamp", saved.getTimestamp().toString()
        ));
    }
}
