import restaurantModel from "../models/restaurantModel"; // Corrected spelling

// CREATE RESTAURANT
export const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    // Validation
    if (!title || !coords) {
      return res.status(500).json({
        success: false,
        message: "Please provide title and address",
      });
    }

    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestaurant.save();

    res.status(201).json({
      success: true,
      message: "New Restaurant created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in create restaurant API",
      error,
    });
  }
};

// GET ALL RESTAURANTS
export const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      return res.status(404).json({
        success: false,
        message: "No restaurants available",
      });
    }
    res.status(200).json({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in get all restaurants API",
      error,
    });
  }
};

// GET RESTAURANT BY ID
export const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).json({
        success: false,
        message: "Please provide restaurant ID",
      });
    }

    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "No restaurant found",
      });
    }
    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in get restaurant by ID API",
      error,
    });
  }
};

// DELETE RESTAURANT
export const deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).json({
        success: false,
        message: "No restaurant found or provide restaurant ID",
      });
    }
    await restaurantModel.findByIdAndDelete(restaurantId);
    res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in delete restaurant API",
      error,
    });
  }
};

