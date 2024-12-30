import JWT from "jsonwebtoken";

export default async (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.headers["authorization"].split(" ")[1];

    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized User",
        });
      } else {
        req.body.id = decoded.id;
        next();
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Please provide Auth Token",
      error,
    });
  }
};

