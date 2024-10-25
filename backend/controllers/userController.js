const User = require("../models/User");
const jwtoken = require("jsonwebtoken");

const createToken = (_id) => {
  return jwtoken.sign({ _id }, process.env.SECRETSTRING, { expiresIn: "3d" });
}; //this will make a token which will last three days.

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, username, password } = req.body;
  console.log(email);
  try {
    const user = await User.signup(email, username, password);
    const token = createToken(user._id);
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
