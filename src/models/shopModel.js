const mongoose = require("mongoose");
const { Schema } = mongoose;

const ShopSchema = new Schema(
  {
    shopName: {
      type: String,
      default: "",
    },

    adress: {
      type: String,
      default: "",
      require: [true, "please we need your adress"],
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
