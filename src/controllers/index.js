const { login, createNewUser } = require("./usersController");
const { creatNewList } = require("./shopListController");
const { saveShopAsFavorite } = require("./shopController");

module.exports = {
  createNewUser: createNewUser,
  login: login,
  creatNewList: creatNewList,
  saveShopAsFavorite: saveShopAsFavorite,
};
