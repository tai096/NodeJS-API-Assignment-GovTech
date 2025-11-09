import express from "express";
import * as teacherController from "../controllers/teacherController.js";

const router = express.Router();

// Register students to a teacher
router.post("/register", teacherController.registerStudents);

// Get common students
router.get("/commonstudents", teacherController.getCommonStudents);

// Suspend a student
router.post("/suspend", teacherController.suspendStudent);

// Retrieve students for notifications
router.post("/retrievefornotifications", teacherController.retrieveForNotifications);

export default router;
