import productModel from "../../models/product.model";

const getAllProducts = async (req: any, res: any) => {
  try {
    const products = await productModel.find();
    res.status(200).json({
      data: products,
      message: "Fetched all the products successfully!",
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

const getProductById = async (req: any, res: any) => {
  try {
    const productId = req.params.id;
    const productExist = await productModel.findById(productId);

    if (!productExist) {
      throw new Error(`Product with the id: ${productId} doesnot exist!`);
    }

    res.status(200).json({
      data: productExist,
      message: `Fetched the product with id: ${productId} successfully!`,
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

export default { getAllProducts, getProductById };
