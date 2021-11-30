const { userModel } = require("../models");
const bcrypt = require("bcrypt");

async function createNewUser(req, res) {
  const { email, password, ...rest } = req.body;

  try {
    const foundUser = await userModel.findOne({ email: email });
    if (foundUser) {
      return res.stauts(200).send({
        message: `the user with this email ${foundUser.email}, already exist`,
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const encrypted = await bcrypt.hash(password, salt);
      const newUser = await userModel.create({
        email: email,
        password: encrypted,
        ...rest,
      });
      return res.status(200).send({
        message: `Welcome ${newUser.userName} to our servise`,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}

async function login() {
  const { email, password, ...rest } = req.body;

  try {
    const foundUser = await userModel.findOne({ email: email });
    if (!foundUser) {
      return res.stauts(404).send({
        message: `Sorry  ${foundUser.userName}, you are not register yet`,
      });
    } else {
      bcrypt.compare(password, foundUser.password).then((isExist) => {
        if (isExist) {
          return res.send("Welcome back" + foundUser.name);
        } else {
          return res.status(500).send({
            message: "incorrect password",
          });
        }
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}

module.exports = {
  createNewUser: createNewUser,
  login: login,
};
