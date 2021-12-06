const Router = require("express").Router;
const shopListRouter = Router();

const { shopListController } = require("../controllers");

shopListRouter.get("/", shopListController.getListShops);
shopListRouter.get("/myList", shopListController.getListShopsOfspecificOwner);

shopListRouter.post("/newShopList", shopListController.creatNewList);
shopListRouter.patch("/addShopinList", shopListController.addShopInList);

module.exports = shopListRouter;
