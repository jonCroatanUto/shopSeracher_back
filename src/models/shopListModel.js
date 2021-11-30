const mongoose = require("mongoose");
const { Schema } = mongoose;

const shopListSchema = new Schema(
  {
    shopListName: {
      type: String,
      default: "",
    },

    shops: [
      {
        type: Schema.Types.ObjectId,
        ref: "shops",
      },
    ],
    owner: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ShopList = mongoose.model("shopList", shopListSchema);
module.exports = ShopList;
