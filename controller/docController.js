import { json } from "express";
import bookModel from "../models/bookModel.js";

export const bookAppointmentController = async (req, res) => {
  try {
    const { email, date, time, month } = req.body;
    const newBooking = new bookModel({
      email,
      date,
      time,
      month
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
