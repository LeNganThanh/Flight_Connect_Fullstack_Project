//===> Packages
import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import mongoose from "mongoose";
//===> API routes
import autocompRoute from "./router.js";
import searchRoute from "./SearchRoute.js";
import airportRoute from "./airportRoute.js";
import dealsRoute from "./dealsRoute.js";
import activityRoute from "./activityRoute.js";

// ===> Backend local routes
import userRoute from "../routes/userRoute.js";

// ===> Mongoose Url
import { MONGOOSE_URL } from "./config.js";

// ===> Setting the server
const app = express();
const PORT = 1338;

//===> Using the packages
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));

//===> Multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let fullPath = "./upload/";
    cb(null, fullPath);
  },
  fileName: function (req, file, cb) {
    let fileName = Date.now() + " " + file.originalName;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

//===> Mongoose connection

mongoose.connect(MONGOOSE_URL);

//===> Routes
app.use("/users", upload.single("image"), userRoute);

//===> Applying handler for API

app.use("/", autocompRoute);
app.use("/", searchRoute);
app.use("/", airportRoute);
app.use("/", dealsRoute);
app.use("/", activityRoute);

//===> Static files

app.use(express.static("../react/build"));

app.get("/", (req, res) => {
  res.sendFile("../react/build/index.html", { root: "." });
});

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
