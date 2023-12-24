import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import docRoutes from "./route/docRoutes.js"
import mogran from "morgan";
import cors from "cors";

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();


//middlewares
app.use(cors());
app.use(express.json());
app.use(mogran("dev"));

//routes
app.use("/api/v1/doc", docRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to appointment booking website</h1>");
});
//port
const port = 8000;

//run listen
app.listen(port, () => {
  console.log(`server running on ${port}`);
});