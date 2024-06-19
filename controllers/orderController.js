import asyncHandler from "express-async-handler";
import Order from "../models/order.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { items, deliveryAddress, total, restaurant } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  if (!deliveryAddress || !total || !restaurant) {
    res.status(400);
    throw new Error(
      "Please provide all required fields: deliveryAddress, total, restaurant"
    );
  }

  const order = new Order({
    customer: req.user._id,
    restaurant,
    items,
    deliveryAddress,
    total,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("customer", "name email")
    .populate("restaurant", "name");

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private/Admin
// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private/Admin
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.status = "paid"; // Make sure status is updated to 'paid'
    order.paymentMethod = req.body.paymentMethod;
    order.paymentResult = {
      id: req.body.paymentResult.id,
      status: req.body.paymentResult.status,
      update_time: req.body.paymentResult.update_time,
      email_address: req.body.paymentResult.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = "delivered";
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ customer: req.user._id });
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  updateOrderToDelivered,
};
