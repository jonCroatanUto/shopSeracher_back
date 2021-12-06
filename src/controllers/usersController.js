const { userModel } = require("../models");
const bcrypt = require("bcrypt");
const axios = require("axios");

async function createNewUser(req, res) {
  const { email, password, ...rest } = req.body;

  try {
    const foundUser = await userModel.findOne({ email: email });
    if (foundUser) {
      return res.stauts(200).send({
        message: `the user with this email ${foundUser.email}, already exist`,
        succes: false,
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
        succes: true,
        newUser: newUser,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const foundUser = await userModel.findOne({ email: email });
    if (!foundUser) {
      return res.status(404).send({
        message: `Sorry this email ${email}, is not register yet`,
        succes: false,
      });
    } else {
      bcrypt.compare(password, foundUser.password).then((isExist) => {
        if (isExist) {
          return res.status(200).send({
            message: `Welcome back ${foundUser.name}`,
            succes: true,
            foundUser: foundUser,
          });
        } else {
          return res.status(500).send({
            message: "incorrect password",
            succes: false,
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
async function getUser(req, res) {
  try {
    const users = await userModel.find({}).populate("shopList");
    if (users.length <= 0) {
      return res.status(200).send({
        message: "No users",
      });
    } else {
      return res.status(200).send({
        users: users,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}
async function getUserLocation(req, res) {
  try {
    axios
      .post(
        "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDXisOj5QbywrYEfmzOXL0-7QF3HiLm87M"
      )
      .then((response) => {
        console.log(response);
        return res.send(response.data);
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: error.message,
    });
  }
}
module.exports = {
  createNewUser: createNewUser,
  login: login,
  getUser: getUser,
  getUserLocation: getUserLocation,
};
