const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
  },
  description: {
    type: String,
    required: [true, "Mesage is Required"],
  },
});

const Contact = new mongoose.model("contact", contactSchema);
module.exports = Contact;
