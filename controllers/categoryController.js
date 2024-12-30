import categoryModel from "../models/categoryModel.js";

// CREATE CATEGORY
export const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Please provide a category title.",
      });
    }

    // Create new category
    const newCategory = await categoryModel.create({ title, imageUrl });
    res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category: newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in Create Category API.",
      error: error.message,
    });
  }
};

// GET ALL CATEGORIES
export const getAllCatController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).json({
      success: true,
      totalCategories: categories.length,
      categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in Get All Categories API.",
      error: error.message,
    });
  }
};

// UPDATE CATEGORY
export const updateCatController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;

    // Update category
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      category: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in Update Category API.",
      error: error.message,
    });
  }
};

// DELETE CATEGORY
export const deleteCatController = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    // Delete category
    await categoryModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in Delete Category API.",
      error: error.message,
    });
  }
};

