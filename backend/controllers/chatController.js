import Chat from "../modals/Chat.js";

//API controller to create new chat
export const createChat = async (req, res) => {
  try {
    const userId = req.user._id;

    const chatData = {
      userId,
      messages: [],
      name: "New Chat",
      userName: req.user.name,
    };
    await Chat.create(chatData);
    return res.json({
      success: true,
      message: "Chat created successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// API controller to get all chats

export const getChats = async (req, res) => {
  try {
    const userId = req.user._id;
    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });
    return res.json({
      success: true,
      chats,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteChat = async (req, res) => {
  const { chatId } = req.body;
  const userId = req.user._id;
  try {
    if (!chatId) {
      return res.json({
        success: false,
        message: "Chat not found",
      });
    }
    await Chat.findOneAndDelete({ _id: chatId, userId });
    return res.json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
