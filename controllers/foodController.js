import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";

// CREATE FOOD
export const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    if (!title || !description || !price || !restaurant) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    });

    await newFood.save();
    res.status(201).json({
      success: true,
      message: "New food item created",
      newFood,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating food item",
      error,
    });
  }
};

// GET ALL FOODS
export const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching food items",
      error,
    });
  }
};

// GET SINGLE FOOD
export const getSingleFoodController = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).json({
        success: false,
        message: "No food item found with this ID",
      });
    }
    res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching food item",
      error,
    });
  }
};

// GET FOOD BY RESTAURANT
export const getFoodByRestaurantController = async (req, res) => {
  try {
    const { id } = req.params;
    const foods = await foodModel.find({ restaurant: id });
    res.status(200).json({
      success: true,
      message: "Foods based on restaurant",
      foods,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching food items by restaurant",
      error,
    });
  }
};

// UPDATE FOOD ITEM
export const updateFoodController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedFood = await foodModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedFood) {
      return res.status(404).json({
        success: false,
        message: "No food item found with this ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food item updated successfully",
      updatedFood,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating food item",
      error,
    });
  }
};

// DELETE FOOD
export const deleteFoodController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFood = await foodModel.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).json({
        success: false,
        message: "No food item found with this ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food item deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting food item",
      error,
    });
  }
};

// PLACE ORDER
export const placeOrderController = async (req, res) => {
  try {
    const { cart, id: buyer } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart cannot be empty",
      });
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer,
    });

    await newOrder.save();
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error placing order",
      error,
    });
  }
};

// CHANGE ORDER STATUS
export const orderStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "No order found with this ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating order status",
      error,
    });
  }
};
