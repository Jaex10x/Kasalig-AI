package com.kasalig.ai.repository;

import com.kasalig.ai.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByUserIdOrderByTimestampAsc(Long userId);
}
