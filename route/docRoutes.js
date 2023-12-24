import express from "express";
import { bookAppointmentController, verifyController } from "../controller/docController.js";

//router object
const router = express.Router()

//routing
router.post('/register', bookAppointmentController);

router.post("/verify", verifyController);

export default router;