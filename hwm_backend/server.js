require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const { sequelize } = require("./models");
const errorHandler = require("./middleware/error.middleware");

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 60 * 1000, max: 200 }));

// routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/patients", require("./routes/patients.routes"));
app.use("/api/doctors", require("./routes/doctors.routes"));
app.use("/api/appointments", require("./routes/appointments.routes"));
app.use("/api/prescriptions", require("./routes/prescriptions.routes"));

// health check
app.get("/", (req, res) => res.send("Backend is running!"));

// error handler
app.use(errorHandler);

// start server
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log("All models synced");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
