const mongoose = require("mongoose");
const { Schema } = mongoose;

const ShopSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    businessType: {
      type: String,
      default: "",
    },

    vicinity: {
      type: String,
      default: "",
      require: [true, "the shop adress is not setted"],
    },
    rating: {
      type: Number,
    },
    user_ratings_total: {
      type: Number,
    },
    latitude: {
      type: Number,
      default: "",
      require: [true, "the latitude adress is not setted"],
    },
    longitude: {
      type: Number,
      default: "",
      require: [true, "the longitude adress is not setted"],
    },
    icon: {
      type: String,
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
