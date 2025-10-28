import User from "../modals/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Chat from "../modals/Chat.js";

//Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
    const newUser = await User.create({ email, name, password });
    const token = generateToken(newUser._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        const token = generateToken(user._id);
        res.json({
          success: true,
          token,
        });
      }
    }

    return res.json({
      success: false,
      message: "Invalid email or password",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = req.user;
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getPublishedImages = async (req, res) => {
  try {
    const publishedImageMessages = await Chat.aggregate([
      { $unwind: "$messages" },
      { $match: { "messages.isPublished": true, "messages.isImage": true } },
      {
        $project: {
          _id: 0,
          imageUrl: "$messages.content",
          userName: "$userName",
        },
      },
    ]);
    res.json({
      success: true,
      images: publishedImageMessages.reverse(),
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
