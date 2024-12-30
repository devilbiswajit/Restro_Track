import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDb from "./config/db";

dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use("/api/v1/auth", import("./routes/authRoutes"));
app.use("/api/v1/user", import("./routes/userRoutes"));
app.use("/api/v1/resturant", import("./routes/resturantRoutes"));
app.use("/api/v1/category", import("./routes/catgeoryRoutes"));
app.use("/api/v1/food", import("./routes/foodRoutes"));

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to Food Server APP API BASE PROJECT BRUHH</h1>");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
