const Router = require("express").Router;
const shopRouter = Router();
const { shopController } = require("../controllers");

// shopRouter.get("/", shopController.saveShopAsFavorite);
shopRouter.post("/saveShop", shopController.saveShopAsFavorite);

module.exports = shopRouter;
