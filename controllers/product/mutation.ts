import productModel from "../../models/product.model";
import { Request, Response } from "express";

const createProduct = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(500).json({
      data: null,
      message: error.message || "Internal server error!",
      success: false,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const productExist = await productModel.findById(productId);

    if (!productExist) {
      throw new Error(`Product with the id: ${productId} doesnot exist!`);
    }

    await productModel.findByIdAndDelete(productId);
    res.status(200).json({
      data: productExist,
      message: `Deleted the product with id: ${productId} successfully!`,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const productExist = await productModel.findById(productId);

    if (!productExist) {
      throw new Error(`Product with the id: ${productId} doesnot exist!`);
    }

    await productModel.findByIdAndUpdate(productId, req.body);
    res.status(200).json({
      data: productExist,
      message: "Updated the product successfully!",
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      message: error.message || "Internal server error",
      success: false,
    });
  }
};

export default { createProduct, deleteProduct, updateProduct };
