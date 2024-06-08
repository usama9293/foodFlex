import mongoose from "mongoose";

const menuSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const restaurantSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    menu: [menuSchema],
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
