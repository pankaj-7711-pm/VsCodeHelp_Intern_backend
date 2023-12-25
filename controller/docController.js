import { json } from "express";
import bookModel from "../models/bookModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const bookAppointmentController = async (req, res) => {
  try {
    const { email, date, time, month, otp, rotp } = req.body;
    if (otp != rotp) {
      res.send({
        success: false,
        message: "wrong otp",
      });
    }
    const newBooking = new bookModel({
      email,
      date,
      time,
      month,
    });
    await newBooking.save();
    res.status(201).send({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Booking",
      error,
    });
  }
};

export const verifyController = async (req, res) => {
  try {
    const { dateofapp, timeofapp, monthofapp } = req.body;
    const alreadyBooked = await bookModel.find({
      $and: [{ date: dateofapp }, { time: timeofapp }, { month: monthofapp }],
    });

    if (alreadyBooked.length > 0) {
      res.send({
        success: true,
        message: "Already Booked",
      });
    } else {
      res.send({
        success: false,
        message: "Not Booked",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Verifying",
      error,
    });
  }
};

export const sendOtpController = async (req, res) => {
  const { email } = req.body;
  const temp = Math.floor(1000 + Math.random() * 9000);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_M,
      pass: process.env.PASS,
    },
  });
  const mailOptions = {
    from: "pankajmandalplt58@gmail.com",
    to: email,
    subject: "Welcome to Booking App",
    text: `Your OTP is ${temp}`,
  };
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Eamil sent successfully");
    res.send({
      success: true,
      message: "Otp generated Successfully",
      temp,
    });
  } catch (error) {
    console.log(error);
  }
};
