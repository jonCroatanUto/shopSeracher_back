const { shopListModel } = require("../models");

async function creatNewList(res, req) {
  const { shopListName, ...rest } = req.body;

  try {
    const foundShopList = await shopListModel.findOne({
      shopListName: shopListName,
    });
    if (foundShopList) {
      return res.stauts(200).send({
        message: `Please choose another name for your list. ${shopListName} already exist `,
      });
    } else {
      const { shopListName } = await shopListModel.create({
        shopListName: shopListName,

        ...rest,
      });
      return res.status(200).send({
        message: `the shop ${shopListName} was succesfully saved`,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}
async function addShopInList(res, req) {
  const { shopId, shopListName, ...rest } = req.body;

  try {
    const foundShopList = await shopListModel.findOne({
      shopListName: shopListName,
    });
    if (!foundShopList) {
      return res.stauts(200).send({
        message: `The list ${shopListName} doesn't exist `,
      });
    } else {
      const existInList = foundShopList.shops.indexOf(shopId);
      // checking if the list it's already in the list
      if (existInList === -1) {
        // if not :added
        foundShopList.shops.push(shopId);
      }
      return res.status(200).send({
        message: `the shop  was added to ${shopListName} `,
        updatedlist: foundShopList,
      });
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
