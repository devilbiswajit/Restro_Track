import userModel from "../models/userModel";

export default async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (user.usertype !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Only Admin Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Unauthorized Access",
      error,
    });
  }
};

