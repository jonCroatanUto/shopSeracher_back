// imports
const mongoose = require("mongoose");
const { config } = require("../config");

// db connection
function connect() {
  console.log(config.db.url);
  return mongoose.connect(config.db.url);
}

module.exports = connect;
