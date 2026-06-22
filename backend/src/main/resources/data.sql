-- Seed Data for Kasalig AI
-- Test user (password: 'password123' - BCrypt hashed)
MERGE INTO users (id, full_name, email, password) KEY(id)
VALUES (1, 'John Doe', 'john.doe@example.com', '$2a$10$8.UnVuG9HHgffUDAlk8qCOuy5fKbYF.tD4QYyNlSgWnO/n1k58C7.');

-- Seed Applications
MERGE INTO applications (id, title, icon, status, status_type, steps_completed, total_steps, submitted_date, estimated_date, completed_date, user_id) KEY(id) VALUES
('KSL-2026-00142', 'National ID (PhilSys)', 'id', 'Ready for Pickup', 'ready', 4, 4, 'March 15, 2026', 'May 5, 2026', NULL, 1);
MERGE INTO applications (id, title, icon, status, status_type, steps_completed, total_steps, submitted_date, estimated_date, completed_date, user_id) KEY(id) VALUES
('KSL-2026-00213', 'Business Registration (DTI)', 'business', 'Under Review', 'review', 2, 4, 'April 20, 2026', 'May 20, 2026', NULL, 1);
MERGE INTO applications (id, title, icon, status, status_type, steps_completed, total_steps, submitted_date, estimated_date, completed_date, user_id) KEY(id) VALUES
('KSL-2026-00287', 'Birth Certificate (PSA)', 'document', 'Pending', 'pending', 1, 4, 'May 8, 2026', 'May 22, 2026', NULL, 1);
MERGE INTO applications (id, title, icon, status, status_type, steps_completed, total_steps, submitted_date, estimated_date, completed_date, user_id) KEY(id) VALUES
('KSL-2025-09921', 'Passport Application (DFA)', 'document', 'Completed', 'completed', 4, 4, 'Dec 3, 2025', NULL, 'Dec 22, 2025', 1);

-- Seed Timeline Steps for National ID (KSL-2026-00142)
INSERT INTO timeline_steps (application_id, step_label, step_date, done) VALUES
('KSL-2026-00142', 'Application Submitted', 'Mar 15, 2026', TRUE);
INSERT INTO timeline_steps (application_id, step_label, step_date, done) VALUES
('KSL-2026-00142', 'Under Review', 'Mar 18, 2026', TRUE);
INSERT INTO timeline_steps (application_id, step_label, step_date, done) VALUES
('KSL-2026-00142', 'Approved for Processing', 'Apr 10, 2026', TRUE);
INSERT INTO timeline_steps (application_id, step_label, step_date, done) VALUES
('KSL-2026-00142', 'Ready for Pickup', 'May 5, 2026', TRUE);

-- Seed Timeline Steps for Business Registration (KSL-2026-00213)
INSERT INTO timeline_steps (application_id, step_label, step_date, done) VALUES
('KSL-2026-00213', 'Application Submitted', 'Apr 20, 2026', TRUE);
INSERT INTO timeline_steps (application_id, step_label, step_date, done) VALUES
('KSL-2026-00213', 'Under Review', 'Apr 25, 2026', TRUE);
INSERT INTO timeline_steps (application_id, step_label, step_date, done) VALUES
('KSL-2026-00213', 'Approved for Processing', NULL, FALSE);
INSERT INTO timeline_steps (application_id, step_label, step_date, done) VALUES
('KSL-2026-00213', 'Ready for Pickup', NULL, FALSE);

-- Seed Timeline Steps for Birth Certificate (KSL-2026-00287)
INSERT INTO timeline_steps (application_id, step_label, step_date, done) VALUES
('KSL-2026-00287', 'Application Submitted', 'May 8, 2026', TRUE);
INSERT INTO timeline_steps (application_id, step_label, step_date, done) VALUES
('KSL-2026-00287', 'Under Review', NULL, FALSE);
INSERT INTO timeline_steps (application_id, step_label, step_date, done) VALUES
('KSL-2026-00287', 'Approved for Processing', NULL, FALSE);
INSERT INTO timeline_steps (application_id, step_label, step_date, done) VALUES
('KSL-2026-00287', 'Ready for Pickup', NULL, FALSE);

-- Seed Timeline Steps for Passport Application (KSL-2025-09921)
INSERT INTO timeline_steps (application_id, step_label, step_date, done) VALUES
('KSL-2025-09921', 'Application Submitted', 'Dec 3, 2025', TRUE);
INSERT INTO timeline_steps (application_id, step_label, step_date, done) VALUES
('KSL-2025-09921', 'Under Review', 'Dec 8, 2025', TRUE);
INSERT INTO timeline_steps (application_id, step_label, step_date, done) VALUES
('KSL-2025-09921', 'Approved for Processing', 'Dec 15, 2025', TRUE);
INSERT INTO timeline_steps (application_id, step_label, step_date, done) VALUES
('KSL-2025-09921', 'Completed', 'Dec 22, 2025', TRUE);

-- Seed Pickup Info for National ID
MERGE INTO pickup_info (id, application_id, location, hours) KEY(id) VALUES
(1, 'KSL-2026-00142', 'SM Megamall Kasalig Service Center, 3rd Floor, EDSA, Mandaluyong City.', 'Mon-Fri 8:00 AM - 5:00 PM');

-- Seed Chat Messages
INSERT INTO chat_messages (user_id, sender, content) VALUES
(1, 'user', 'How do I apply for a PhilSys National ID?');
INSERT INTO chat_messages (user_id, sender, content) VALUES
(1, 'ai', 'To apply for a PhilSys National ID, you need to prepare standard supporting documents (such as your Birth Certificate or Passport), register online, and book an appointment at a registration center.');
