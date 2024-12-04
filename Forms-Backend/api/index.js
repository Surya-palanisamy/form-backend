const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add this to parse form data


// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://surya:Suryaswathi@cluster0.lnw3d.mongodb.net/backend?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Schema Definition
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  college: String,
  department: String,
  year: String
},{timestamps:true});

const Form = mongoose.model("Form", formSchema);

// POST endpoint to submit the form data
app.post("/submit", async (req, res) => {
  const { name, email, mobile, college, department, year } =req.body;

  const formData = new Form({
    name,
    email,
    mobile,
    college,
    department,
    year,
    
  });

  try {
    await formData.save();
    res.status(201).send("Form Submitted Successfully");
  } catch (error) {
    res.status(500).send("Error submitting the form");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
