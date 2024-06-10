import productModel from "../../models/product.model.js";

const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock } = req.body;

    if (!name || !description || !category || !price || !stock) {
      throw new Error("Please enter all the fields!");
    }

    await productModel.create({ name, description, category, price, stock });

    res.status(200).json({
      data: req.body,
      message: "Created product successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message || "Internal server error!",
      success: false,
    });
  }
};

export default { createProduct };
