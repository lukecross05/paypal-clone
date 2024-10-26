const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  console.log("checking auth.");
  console.log(req.headers);
  const { authorisation } = req.headers; //get the token.
  if (!authorisation) {
    return res.status(401).json({ error: "auth token required" });
  }
  const token = authorisation.split(" ")[1]; //get the middle section of the token.
  console.log(token);
  try {
    const { _id, email } = jwt.verify(token, process.env.SECRETSTRING); //verify the token with the secret string.
    const user = await User.findOne({ _id }).select("_id email username");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = user;
    req.token = token;
    next(); //move onto the next route.
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "request not authorised" });
  }
};

module.exports = requireAuth;
