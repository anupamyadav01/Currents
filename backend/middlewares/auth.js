const privateKey = "something-private-key";
const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).send({
      status: false,
      message: "User Login required...",
    });
  }
  try {
    const user = await jwt.verify(token, privateKey);
    if (!user) {
      return res.status(400).send({
        status: false,
        message: "User Login required...",
      });
    }
    req.user = user.id;
    next();
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
      messageForDev: "error from auth",
    });
  }
};
module.exports = verifyUser;
