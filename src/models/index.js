import Teacher from "./Teacher.js";
import Student from "./Student.js";
import Registration from "./Registration.js";

// Define associations
Teacher.belongsToMany(Student, {
  through: Registration,
  foreignKey: "teacherId",
  otherKey: "studentId",
  as: "students",
});

Student.belongsToMany(Teacher, {
  through: Registration,
  foreignKey: "studentId",
  otherKey: "teacherId",
  as: "teachers",
});

// Direct associations for easier querying
Registration.belongsTo(Teacher, { foreignKey: "teacherId", as: "teacher" });
Registration.belongsTo(Student, { foreignKey: "studentId", as: "student" });
Teacher.hasMany(Registration, { foreignKey: "teacherId", as: "registrations" });
Student.hasMany(Registration, { foreignKey: "studentId", as: "registrations" });

export { Teacher, Student, Registration };
