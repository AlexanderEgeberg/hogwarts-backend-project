DROP TABLE IF EXISTS course_students, courses, students, teachers, houses CASCADE;

CREATE TABLE houses (
  name TEXT PRIMARY KEY
);

CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  house TEXT NOT NULL REFERENCES houses (name) ON UPDATE CASCADE
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  house TEXT NOT NULL REFERENCES houses (name) ON UPDATE CASCADE
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  teacher_id INTEGER NOT NULL REFERENCES teachers (id) ON DELETE CASCADE
);

CREATE TABLE course_students (
  course_id INTEGER NOT NULL REFERENCES courses (id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES students (id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, student_id)
);

INSERT INTO houses (name) VALUES
  ('Gryffindor'),
  ('Hufflepuff'),
  ('Ravenclaw'),
  ('Slytherin');

INSERT INTO teachers (name, house) VALUES
  ('Minerva McGonagall', 'Gryffindor'),
  ('Severus Snape', 'Slytherin'),
  ('Filius Flitwick', 'Ravenclaw'),
  ('Pomona Sprout', 'Hufflepuff'),
  ('Remus Lupin', 'Gryffindor');

INSERT INTO students (name, house) VALUES
  ('Harry Potter', 'Gryffindor'),
  ('Hermione Granger', 'Gryffindor'),
  ('Ron Weasley', 'Gryffindor'),
  ('Draco Malfoy', 'Slytherin'),
  ('Luna Lovegood', 'Ravenclaw'),
  ('Cedric Diggory', 'Hufflepuff'),
  ('Cho Chang', 'Ravenclaw');

INSERT INTO courses (name, teacher_id) VALUES
  ('Transfiguration', 1),
  ('Potions', 2),
  ('Charms', 3),
  ('Herbology', 4);

INSERT INTO course_students (course_id, student_id) VALUES
  (1, 1), (1, 2), (1, 3),
  (2, 1), (2, 4),
  (3, 2), (3, 5), (3, 7),
  (4, 6), (4, 3);
