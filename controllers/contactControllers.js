const Contact = require("../model/contactModel");

const contactUser = async (req, res) => {
  try {
    const { name, email, description } = req.body;

    let existingData = await Contact.find({ email });

    if (!(existingData.length < 5)) {
      return res.status(403).json({
        message:
          "You Have already sent few messages to us hang tight we will contact you",
      });
    }

    const newContactMessage = new Contact({
      email,
      name,
      description,
    });

    await newContactMessage.save();

    res.status(201).json({
      message: "We Got Your Message",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "something went wrong please try again later",
    });
  }
};

module.exports = contactUser;
