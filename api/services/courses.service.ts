import * as coursesRepository from "../repositories/courses.repository.ts";
import * as studentsRepository from "../repositories/students.repository.ts";
import * as teachersRepository from "../repositories/teachers.repository.ts";

// Kurset i URL'en skal findes (404), læreren/eleven i body skal findes (400).
const requireCourse = async (id: number) => {
  const course = await coursesRepository.findById(id);
  if (!course) throw 404;
};

export const changeTeacher = async (courseId: number, teacherId: number) => {
  await requireCourse(courseId);
  const teacher = await teachersRepository.findById(teacherId);
  if (!teacher) throw 400;
  return await coursesRepository.setTeacher(courseId, teacherId);
};

export const addStudent = async (courseId: number, studentId: number) => {
  await requireCourse(courseId);
  const student = await studentsRepository.findById(studentId);
  if (!student) throw 400;
  const added = await coursesRepository.addStudent(courseId, studentId);
  if (!added) throw 409;
};

export const removeStudent = async (courseId: number, studentId: number) => {
  await requireCourse(courseId);
  const removed = await coursesRepository.removeStudent(courseId, studentId);
  if (!removed) throw 404;
};
