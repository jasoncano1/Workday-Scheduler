-- Drop and recreate the users table
DROP TABLE IF EXISTS users;

CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   username VARCHAR(50) NOT NULL,
   password VARCHAR(255) NOT NULL, -- Increased to accommodate bcrypt hashes
   task VARCHAR(100),
   date TIMESTAMP,
   status VARCHAR(50)
);

-- Seed data for users without tasks
INSERT INTO users (username, password) VALUES
('test3', '$2b$10$0ovOCAA0bpp8U/7VTHZdvebSwmCkVnHkKIVbl19HgdqTFqi9FOBbK'),
('test', '$2b$10$ls0c8j/OndlUUzCbRKNze.xtjl6vRwN0Hh/ebhc970go1LI.sUVLq');

-- Insert tasks for jasoncano1 user
INSERT INTO users (username, password, task, date, status) VALUES
-- February 24, 2025
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Go see puppies', '2025-02-20 14:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Go see puppies', '2025-02-20 15:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Go see puppies', '2025-02-20 16:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Taxes', '2025-02-20 17:00:00', 'done'),

-- March 03, 2025
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Coding class', '2025-03-03 09:00:00', 'pending'),

-- March 04, 2025 (Mon)
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Coding Development', '2025-03-04 09:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Coding Development', '2025-03-04 10:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Coding', '2025-03-04 11:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Lunch', '2025-03-04 12:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Phone Calls', '2025-03-04 13:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Robotics Development', '2025-03-04 14:00:00', 'done'),
('jasoncano1', '$2b$10$EH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'robotic development', '2025-02-13 14:00:00', 'pending'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'robotic development', '2025-02-13 15:00:00', 'pending'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'book study', '2025-02-13 16:00:00', 'pending'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'book study', '2025-02-13 17:00:00', 'pending'),

-- February 14, 2025
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'development class', '2025-02-14 09:00:00', 'pending'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'development class', '2025-02-14 10:00:00', 'pending'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'coding', '2025-02-14 11:00:00', 'pending'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'lunch', '2025-02-14 12:00:00', 'pending'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'robotic development', '2025-02-14 13:00:00', 'pending'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'robotic development', '2025-02-14 14:00:00', 'pending'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'robotic development', '2025-02-14 15:00:00', 'pending'),

-- February 20, 2025
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'development class', '2025-02-20 09:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Prepare for Meeting', '2025-02-20 10:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Head to Meeting', '2025-02-20 11:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Meeting Northland', '2025-02-20 12:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Socialize', '2025-02-20 13:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Robotics Development', '2025-02-25 16:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Robotics Development', '2025-02-25 17:00:00', 'done'),

-- February 12, 2025
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'development class', '2025-02-12 09:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'development class', '2025-02-12 10:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'coding', '2025-02-12 11:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Lunch', '2025-02-12 12:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Robotics Development', '2025-02-12 13:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Robotics Development', '2025-02-12 14:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Robotics Development', '2025-02-12 15:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'book study', '2025-02-12 16:00:00', 'pending'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'book study', '2025-02-12 17:00:00', 'pending'),

-- February 13, 2025
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'development class', '2025-02-13 09:00:00', 'pending'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'development class', '2025-02-13 10:00:00', 'pending'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'coding', '2025-02-13 11:00:00', 'pending'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'lunch', '2025-02-13 12:00:00', 'pending'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'robotic development', '2025-02-13 13:00:00', 'pending'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'development class', '2025-02-24 09:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Call with Jason', '2025-02-24 10:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'coding', '2025-02-24 11:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Lunch', '2025-02-24 12:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Coding', '2025-02-24 13:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'robotic Development', '2025-02-24 14:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'robotic Development', '2025-02-24 15:00:00', 'done'),

-- February 25, 2025
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'development class', '2025-02-25 09:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Coding', '2025-02-25 10:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Leave for meeting', '2025-02-25 11:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Meeting', '2025-02-25 12:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Socialize', '2025-02-25 13:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6', 'Robotics Development', '2025-02-25 15:00:00', 'done'),
('jasoncano1', '$2b$10$WtcllE8la