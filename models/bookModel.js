import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
});

export default mongoose.model("bookings", BookingSchema);
