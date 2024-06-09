// controllers/restController.js

import asyncHandler from "express-async-handler";
import Restaurant from "../models/resturant.js";

// @desc    Create a new restaurant
// @route   POST /api/restaurants
// @access  Private/Admin
const createRestaurant = asyncHandler(async (req, res) => {
  const { name, address, menu } = req.body;

  const restaurantExists = await Restaurant.findOne({ name });

  if (restaurantExists) {
    res.status(400);
    throw new Error("Restaurant already exists");
  }

  const restaurant = await Restaurant.create({
    name,
    address,
    menu,
  });

  if (restaurant) {
    res.status(201).json(restaurant);
  } else {
    res.status(400);
    throw new Error("Invalid restaurant data");
  }
});

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find({});
  res.json(restaurants);
});

// @desc    Get a single restaurant by ID
// @route   GET /api/restaurants/:id
// @access  Public
const getRestaurantById = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404);
    throw new Error("Restaurant not found");
  }
});

// @desc    Update a restaurant
// @route   PUT /api/restaurants/:id
// @access  Private/Admin
const updateRestaurant = asyncHandler(async (req, res) => {
  const { name, address, menu } = req.body;

  const restaurant = await Restaurant.findById(req.params.id);

  if (restaurant) {
    restaurant.name = name || restaurant.name;
    restaurant.address = address || restaurant.address;
    restaurant.menu = menu || restaurant.menu;

    const updatedRestaurant = await restaurant.save();
    res.json(updatedRestaurant);
  } else {
    res.status(404);
    throw new Error("Restaurant not found");
  }
});

// @desc    Delete a restaurant
// @route   DELETE /api/restaurants/:id
// @access  Private/Admin
const deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

  if (restaurant) {
    res.json({ message: "Restaurant removed" });
  } else {
    res.status(404);
    throw new Error("Restaurant not found");
  }
});

// @desc    Add a menu item to a restaurant
// @route   POST /api/restaurants/:id/menu
// @access  Private/Admin
const addMenuItem = asyncHandler(async (req, res) => {
  const { name, price } = req.body;

  const restaurant = await Restaurant.findById(req.params.id);

  if (restaurant) {
    const newMenuItem = { name, price };

    restaurant.menu.push(newMenuItem);
    const updatedRestaurant = await restaurant.save();

    res.status(201).json(updatedRestaurant);
  } else {
    res.status(404);
    throw new Error("Restaurant not found");
  }
});

// @desc    Remove a menu item from a restaurant
// @route   DELETE /api/restaurants/:id/menu/:menuItemId
// @access  Private/Admin
const removeMenuItem = asyncHandler(async (req, res) => {
  const { id, menuItemId } = req.params;

  const restaurant = await Restaurant.findById(id);

  if (restaurant) {
    restaurant.menu = restaurant.menu.filter(
      (item) => item._id.toString() !== menuItemId
    );

    const updatedRestaurant = await restaurant.save();
    res.json(updatedRestaurant);
  } else {
    res.status(404);
    throw new Error("Restaurant not found");
  }
});

export {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  addMenuItem,
  removeMenuItem,
};
