const { shopListModel, userModel } = require("../models");

async function getListShops(req, res) {
  try {
    const shopsList = await shopListModel.find({});
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
async function getListShopsOfspecificOwner(req, res) {
  const { ownerId } = req.query;
  console.log("param recived", ownerId);
  try {
    const shopsList = await shopListModel.findOne({
      owner: ownerId,
    });
    // const ownerList= shopsList.owner.indexOf(ownerId)

    console.log("lists founded", shopsList);
    if (shopsList === null) {
      return res.status(200).send({
        message: "Incorrect owner id",
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
        succes: false,
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
        succes: true,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}
async function addShopInList(req, res) {
  const { shopId, shopListName } = req.body;

  try {
    const foundShopList = await shopListModel.findOne({
      shopListName: shopListName,
    });
    if (!foundShopList) {
      return res.status(200).send({
        message: `The list shop doesn't exist `,
        succes: false,
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
          succes: true,

          updatedlist: foundShopList,
        });
      } else {
        return res.status(200).send({
          message: `this shop it's already exist in the list: ${foundShopList.shopListName} `,
          succes: false,
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
  getListShopsOfspecificOwner: getListShopsOfspecificOwner,
};
