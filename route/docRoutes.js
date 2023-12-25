import express from "express";
import { bookAppointmentController, sendOtpController, verifyController } from "../controller/docController.js";

//router object
const router = express.Router()

//routing
router.post('/register', bookAppointmentController);

router.post("/verify", verifyController);

router.post("/sendotp", sendOtpController);

export default router;