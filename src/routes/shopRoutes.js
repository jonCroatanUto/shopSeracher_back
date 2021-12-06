const Router = require("express").Router;
const shopRouter = Router();
const { shopController } = require("../controllers");

shopRouter.get("/:ownerId", shopController.getShops);
shopRouter.post("/nearlyShops", shopController.getNearlyShops);
shopRouter.post("/saveShop", shopController.saveShopAsFavorite);

module.exports = shopRouter;
