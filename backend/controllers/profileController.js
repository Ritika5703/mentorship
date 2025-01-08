const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile/update
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { name, email, location, about, profilePicture } = req.body;

    // Find user by ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if email already exists for another user
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Update basic fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (location) user.location = location;
    if (about) user.about = about;

    // Handle profile picture if provided in base64
    if (profilePicture && profilePicture.startsWith("data:image")) {
      try {
        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(
          profilePicture,
          {
            folder: "profile_pictures",
            transformation: [
              { width: 400, height: 400, crop: "fill" },
              { quality: "auto" },
            ],
          }
        );

        // Delete old profile picture from Cloudinary if exists
        if (user.profilePicture) {
          const publicId = user.profilePicture.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }

        user.profilePicture = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error("Error uploading to Cloudinary:", uploadError);
        return res
          .status(500)
          .json({ message: "Error uploading profile picture" });
      }
    }

    // Save updated user
    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        location: user.location,
        about: user.about,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};

// Get user profile
// exports.getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select(
//       "name email location bio profilePicture"
//     );

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// Update user profile
// exports.updateUserProfile = async (req, res) => {
//   try {
//     const { name, email, location, bio, profilePicture } = req.body;

//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       req.user.id,
//       { name, email, location, bio, profilePicture },
//       { new: true }
//     ).select("name email location bio profilePicture");

//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const User = require("../models/User");

// exports.getProfile = async (req, res) => {
//   try {

//     const user = await User.findById(req.user.id)
//       .select("-password _id name email role meetings certificates mentorDetails bio about profilePicture rating reviews skills location")
//       .populate("meetings.mentor", "name email");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.role !== "mentee") {
//       return res
//         .status(403)
//         .json({ message: "Access denied. Not a mentee profile." });
//     }

//     console.log("Found user:", user); // Debugging
//     res.json(user);
//   } catch (error) {
//     console.error("Profile fetch error:", error);
//     res.status(500).json({ message: "Server error while fetching profile" });
//   }
// };

// exports.updateMenteeProfile = async (req, res) => {
//   try {
//     const updates = req.body;
//     delete updates.password; // Prevent password update through this route

//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { $set: updates },
//       { new: true, runValidators: true }
//     ).select("-password");

//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const User = require("../models/User"); // Ensure the User model is properly imported

// In profileController.js
// exports.getUserProfile = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id); // req.user.id should come from JWT
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// In profileController.js

// exports.updateUserProfile = async (req, res) => {
//   const { name, email, location, bio, profilePicture } = req.body;

//   try {
//     // Ensure that req.user.id is populated by JWT middleware
//     const user = await User.findById(req.id); // req.user.id comes from JWT token

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Update user data
//     user.name = name;
//     user.email = email;
//     user.location = location;
//     user.bio = bio;
//     user.profilePicture = profilePicture;

//     await user.save(); // Save the updated user to the database

//     res.json({ message: "Profile updated successfully!" });
//   } catch (error) {
//     console.error("Error updating user profile:", error); // Log any errors for debugging
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.addMeeting = async (req, res) => {
//   try {
//     const { mentorId, theme, date, reminder } = req.body;

//     const user = await User.findById(req.user.id);
//     user.meetings.push({
//       mentor: mentorId,
//       theme,
//       date,
//       reminder,
//       status: "upcoming",
//     });

//     await user.save();
//     res.json(user.meetings);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
