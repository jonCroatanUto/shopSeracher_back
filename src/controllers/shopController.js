const { shopModel } = require("../models");

async function saveShopAsFavorite(res, req) {
  const { coordinates, ...rest } = req.body;

  try {
    const foundShop = await shopModel.findOne({ coordinates: coordinates });
    if (foundShop) {
      return res.stauts(200).send({
        message: `Sorry you already save this shop:${foundShop.shopName} `,
      });
    } else {
      const { shopName } = await shopModel.create({
        coordinates: coordinates,

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
  saveShopAsFavorite: saveShopAsFavorite,
};
