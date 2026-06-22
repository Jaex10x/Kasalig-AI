-- Database Schema for Kasalig AI
-- Compatible with H2 In-Memory Database

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Applications Table
CREATE TABLE IF NOT EXISTS applications (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    icon VARCHAR(50),
    status VARCHAR(50) NOT NULL,
    status_type VARCHAR(50) NOT NULL,
    steps_completed INT DEFAULT 0,
    total_steps INT DEFAULT 4,
    submitted_date VARCHAR(100),
    estimated_date VARCHAR(100),
    completed_date VARCHAR(100),
    user_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Timeline Steps Table
CREATE TABLE IF NOT EXISTS timeline_steps (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL,
    step_label VARCHAR(150) NOT NULL,
    step_date VARCHAR(100),
    done BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

-- 4. Pickup Info Table
CREATE TABLE IF NOT EXISTS pickup_info (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL UNIQUE,
    location TEXT NOT NULL,
    hours VARCHAR(100) NOT NULL,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

-- 5. Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    sender VARCHAR(10) NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
