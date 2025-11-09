-- Teacher-Student Management System - Sample Data
-- This file contains sample data only. Tables are automatically created by Sequelize.
-- Usage: mysql -u root -p teacher_student_db < database_setup.sql

USE teacher_student_db;

-- Insert sample teachers
INSERT INTO teachers (email) VALUES
('teacherken@gmail.com'),
('teacherjoe@gmail.com'),
('teachermary@gmail.com');

-- Insert sample students
INSERT INTO students (email, is_suspended) VALUES
('commonstudent1@gmail.com', FALSE),
('commonstudent2@gmail.com', FALSE),
('student_only_under_teacher_ken@gmail.com', FALSE),
('studentjon@gmail.com', FALSE),
('studenthon@gmail.com', FALSE),
('studentbob@gmail.com', FALSE),
('studentagnes@gmail.com', FALSE),
('studentmiche@gmail.com', FALSE),
('studentmary@gmail.com', FALSE),
('suspendedstudent@gmail.com', TRUE);

-- Verify data
SELECT 'Teachers:' as '';
SELECT * FROM teachers;

SELECT 'Students:' as '';
SELECT * FROM students;

SELECT '✓ Sample data inserted successfully!' as '';
