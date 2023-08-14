//require dotenv and envoke it
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// allow cross origin requests:
const cors = require("cors");
const port = 4000;

app.use(express.json());

// call on express to use CORS
app.use(cors());

// import routes
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

// Attach our Route to our app (express)
app.use("/api/workouts/", workoutRoutes);
app.use("/api/user", userRoutes);

// log out the path and the method of each request
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const mongoUsername = process.env.MONGODB_USERNAME;
const mongoPassword = process.env.MONGODB_PASSWORD;

const mongoURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.ggo2lnw.mongodb.net/?retryWrites=true&w=majority`;

// Define a simple route for Home or Root
app.get("/", (req, res) => {
  res.send("Hello, this is your Express server!");
});

// Connect to Mongo DB
// Connect to MongoDB Atlas
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    // Start the server
    app.listen(port, () => {
      console.log(`Express server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });
