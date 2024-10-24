const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");

const userSchema = new Schema({
  //each transaction needs a sender ID, reciever ID, amount,
  //mongoose.Schema.Types.ObjectId
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, username, password) {
  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error("Existing account registered with email");
  }

  const usernameExists = await this.findOne({ username });
  if (usernameExists) {
    throw Error("Existing account registered with username");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt); //encrypts password for storage.

  const user = await this.create({ email, username, password: hash });
  return user;
};
userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (!user) {
    throw Error("Username doesnt exist.");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    console.log(password);
    throw Error("incorrect password. ");
  }
  return user;
};
module.exports = mongoose.model("User", userSchema);
