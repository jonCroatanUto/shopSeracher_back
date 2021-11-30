const { shopListModel } = require("../models");

async function creatNewList(res, req) {
  const { shopListName, ...rest } = req.body;

  try {
    const foundShopList = await shopModel.findOne({
      shopListName: shopListName,
    });
    if (foundShopList) {
      return res.stauts(200).send({
        message: `Please choose another name for your list. ${shopListName} already exist `,
      });
    } else {
      const { shopListName } = await shopModel.create({
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

module.exports = {
  creatNewList: creatNewList,
};
