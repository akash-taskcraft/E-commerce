const User = require("../models/userModel");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var cloudinary = require("cloudinary").v2;

const processUserProfile = async (userInfo, req) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  userInfo.password_digest = await bcrypt.hashSync(
    userInfo.password_digest,
    salt
  );
  const fileUploaded = await cloudinary.uploader.upload(req.file.path);
  userInfo.profile_image = {
    public_id: fileUploaded.public_id,
    url: fileUploaded.url,
  };

  return userInfo;
  
};

exports.updateProfile = async (req, res) => {
  try {
    const token = req.token;
    const userToken = jwt.verify(token, "my_secret_key");
    if (userToken) {
      const profileInfo = { ...req.body };
      if (profileInfo.email) {
        return res.status(422).json({ message: "You cann't update email" });
      }

      const processedProfileInfo = await processUserProfile(profileInfo, req);

      const updatedUser = await User.findByIdAndUpdate(req.params.id, processedProfileInfo, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
        message: "User Profile Updated successfully",
        type: "success",
        person: updatedUser,
      });
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
}

exports.createUser = async (req, res) => {
  try {
    const userInfo = { ...req.body };
    console.log(userInfo);
    const processedUserInfo = await processUserProfile(userInfo, req);
    const newUser = await User.create(processedUserInfo);
    res.status(201).json({
      message: "New user added",
      type: "success",
      person: newUser,
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(400).json({ message: err.message, type: "error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const token = req.token;
    const user_id = token.userId
    const userToken = jwt.verify(token, "my_secret_key");
    if(userToken) {
      const user = await User.findOne({ user_id });
    
      if(user){
        res.status(200).json({
          message: "User Profile fetched successfully",
          type: "success",
          person: user,
        });
      }
      else {
        res.status(422).json({ message: "Profile not found" });
      }
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(
        password,
        user.password_digest
      );
      if (passwordMatch) {
        const token = jwt.sign({ userId: user._id }, "my_secret_key", {
          expiresIn: "24h",
        });
        res
          .status(200)
          .json({ message: "Login successful", type: "success", token });
      } else {
        res.status(401).json({ error: "Invalid credentials", type: "error" });
      }
    } else {
      res.status(404).json({ error: "User not found", type: "error" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error", type: "error" });
  }
};
