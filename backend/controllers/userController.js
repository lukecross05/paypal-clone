const User = require("../models/User");

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    res.status(200).json({ username, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, username, password } = req.body;
  console.log(email);
  try {
    const user = await User.signup(email, username, password);
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
