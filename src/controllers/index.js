const { login, createNewUser } = require("./usersController");
const { creatNewList, addShopInList } = require("./shopListController");
const { saveShopAsFavorite } = require("./shopController");

module.exports = {
  createNewUser: createNewUser,
  login: login,
  creatNewList: creatNewList,
  saveShopAsFavorite: saveShopAsFavorite,
  addShopInList: addShopInList,
};
