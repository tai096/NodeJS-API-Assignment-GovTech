import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";

const Registration = sequelize.define(
  "Registration",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "teacher_id",
      references: {
        model: "teachers",
        key: "id",
      },
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "student_id",
      references: {
        model: "students",
        key: "id",
      },
    },
  },
  {
    tableName: "registrations",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["teacher_id", "student_id"],
      },
      {
        fields: ["teacher_id"],
      },
      {
        fields: ["student_id"],
      },
    ],
  }
);

export default Registration;
