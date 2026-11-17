const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const bookingRoutes = require("./routes/booking");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
// })
//     .then(() => console.log("MongoDB connected"))
//     .catch((err) => console.log(err));

let isConnected = false;

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        });
        isConnected = true;
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

app.use((req, res, next) => {
    if (!isConnected) {
        connectToDatabase();
    }
    next();
})

// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

module.exports = app;