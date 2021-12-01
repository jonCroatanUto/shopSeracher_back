const { shopModel } = require("../models");
async function getShops(req, res) {
  try {
    const shops = await shopModel.find({}).populate("owner");
    if (shops.length <= 0) {
      return res.status(200).send({
        message: "No users",
      });
    } else {
      return res.status(200).send({
        shops: shops,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}
async function saveShopAsFavorite(req, res) {
  const { latitude, longitude, ...rest } = req.body;

  try {
    const foundShop = await shopModel.findOne({
      latitude: latitude,
      longitude: longitude,
    });
    console.log(foundShop);
    if (foundShop) {
      return res.status(200).send({
        message: `Sorry you already save this shop:${foundShop.shopName} `,
      });
    } else {
      const { shopName } = await shopModel.create({
        latitude: latitude,
        longitude: longitude,

        ...rest,
      });
      return res.status(200).send({
        message: `the shop ${shopName} was succesfully saved`,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}

module.exports = {
  getShops: getShops,
  saveShopAsFavorite: saveShopAsFavorite,
};
