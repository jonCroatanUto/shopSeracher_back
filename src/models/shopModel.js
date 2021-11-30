const mongoose = require("mongoose");
const { Schema } = mongoose;

const ShopSchema = new Schema(
  {
    shopName: {
      type: String,
      default: "",
    },
    businessType: {
      type: String,
      default: "",
    },

    adress: {
      type: String,
      default: "",
      require: [true, "the shop adress is not setted"],
    },
    coordinates: {
      type: String,
      default: "",
      require: [true, "the coordinates adress is not setted"],
    },
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
const Shop = mongoose.model("shops", ShopSchema);
module.exports = Shop;
