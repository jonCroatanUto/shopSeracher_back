const { shopModel } = require("../models");
const axios = require("axios");
const { config } = require("../config");

async function getNearlyShops(req, res) {
  const { type, latitude, longitude, radius } = req.body;
  try {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=${latitude}%2C${longitude}&radius=${radius}&type=${type}&key=${config.db.googleApi}`
      )
      .then((response) => {
        return res.send(response.data);
      });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}
async function getShops(req, res) {
  try {
    const shops = await shopModel.find({});
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
  const { shopName, ...rest } = req.body;
  console.log(req.body);

  try {
    const foundShop = await shopModel.findOne({
      shopName: shopName,
    });
    console.log(foundShop);
    if (foundShop) {
      return res.status(200).send({
        message: `Sorry you already save this shop:${foundShop.shopName} `,
        succes: false,
      });
    } else {
      const newShop = await shopModel.create({
        shopName: shopName,

        ...rest,
      });
      return res.status(200).send({
        message: `the shop ${newShop.shopName} was succesfully saved`,
        succes: true,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}

module.exports = {
  getNearlyShops: getNearlyShops,
  getShops: getShops,
  saveShopAsFavorite: saveShopAsFavorite,
};
