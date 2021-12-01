const { shopListModel } = require("../models");

async function creatNewList(req, res) {
  const { shopListName, ...rest } = req.body;

  try {
    const foundShopList = await shopListModel.findOne({
      shopListName: shopListName,
    });
    if (foundShopList) {
      return res.status(200).send({
        message: `Please choose another name for your list. ${shopListName} already exist `,
      });
    } else {
      const newList = await shopListModel.create({
        shopListName: shopListName,

        ...rest,
      });
      return res.status(200).send({
        message: `the shop ${newList.shopListName} was succesfully saved`,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}
async function addShopInList(req, res) {
  const { shopId, shopListID } = req.body;

  try {
    const foundShopList = await shopListModel.findOne({
      shopListID: shopListID,
    });
    if (!foundShopList) {
      return res.stauts(200).send({
        message: `The list shop doesn't exist `,
      });
    } else {
      const existInList = foundShopList.shops.indexOf(shopId);
      // checking if the list it's already in the list
      if (existInList === -1) {
        // if not :added
        foundShopList.shops.push(shopId);
        foundShopList.save();
        return res.status(200).send({
          message: `the shop  was added to ${foundShopList.shopListName} `,
          updatedlist: foundShopList,
        });
      } else {
        return res.status(200).send({
          message: `this shop it's already exist in the list: ${foundShopList.shopListName} `,
        });
      }
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}

module.exports = {
  creatNewList: creatNewList,
  addShopInList: addShopInList,
};
