const Mentor = require("../models/mentor");

exports.createMentor = async (req, res) => {
  try {
    const { name, email, expertise, price, rating, description } = req.body;
    const img = req.file ? req.file.path : null;

    const newMentor = new Mentor({
      name,
      email,
      expertise,
      price,
      rating,
      description,
      img,
    });

    const savedMentor = await newMentor.save();
    res
      .status(201)
      .json({ message: "Mentor created successfully", mentor: savedMentor });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating mentor", error: error.message });
  }
};

// Get all mentors
exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving mentors", error: error.message });
  }
};

// Get a single mentor by ID
exports.getMentorById = async (req, res) => {
  try {
    const { id } = req.params;
    const mentor = await Mentor.findById(id);

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    res.status(200).json(mentor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving mentor", error: error.message });
  }
};

// Update a mentor by ID
exports.updateMentor = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.file) {
      updates.img = req.file.path; // Update the image path if a new file is uploaded
    }

    const updatedMentor = await Mentor.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedMentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    res
      .status(200)
      .json({ message: "Mentor updated successfully", mentor: updatedMentor });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating mentor", error: error.message });
  }
};

// Delete a mentor by ID
exports.deleteMentor = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMentor = await Mentor.findByIdAndDelete(id);

    if (!deletedMentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    res.status(200).json({ message: "Mentor deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting mentor", error: error.message });
  }
};
