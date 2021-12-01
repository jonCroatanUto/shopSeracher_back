const { shopListModel, userModel } = require("../models");

async function getListShops(req, res) {
  try {
    const shopsList = await shopListModel.find({}).populate("shops");
    console.log(shopsList);
    if (shopsList.length <= 0) {
      return res.status(200).send({
        message: "No list shops yet",
      });
    } else {
      return res.status(200).send({
        shopsList: shopsList,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}
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
      //once the list was created I need to added to the creator
      const findOwer = await userModel.findOne({ _id: newList.owner });
      findOwer.shopList.push(newList._id);
      findOwer.save();
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
  getListShops: getListShops,
  creatNewList: creatNewList,
  addShopInList: addShopInList,
};
