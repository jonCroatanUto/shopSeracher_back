const mongoose = require("mongoose");
const { Schema } = mongoose;

const ShopSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
      require: [
        true,
        "We need the name for the correct functioning of the app",
      ],
    },
    businessType: {
      type: String,
      default: "",
    },

    vicinity: {
      type: String,
      default: "",
      require: [
        true,
        "We need the adress for the correct functioning of the app",
      ],
    },
    rating: {
      type: Number,
      require: [
        true,
        "We need the rating for the correct functioning of the app",
      ],
    },
    user_ratings_total: {
      type: Number,
      require: [
        true,
        "We need the total user ratings for the correct functioning of the app",
      ],
    },
    geometry: {
      location: {
        lat: {
          type: Number,
          require: [
            true,
            "We need to save the latitude of the place, to the correct functioning of the app",
          ],
        },
        lng: {
          type: Number,
          required: [
            true,
            "We need to save the longitude of the place, to the correct functioning of the app",
          ],
        },
      },
    },

    icon: {
      type: String,
      require: [
        true,
        "We need the icon for the correct functioning of the app",
      ],
    },
    owner: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
        require: [
          true,
          "We need to set a owner for the correct functioning of the app",
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Shop = mongoose.model("shops", ShopSchema);
module.exports = Shop;
