import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler"; // Middleware to handle exceptions inside async express routes

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  // Get all the products from MongoDB
  const products = await Product.find({});
  res.json(products);
});

// @desc Fetch single product
// @route GET /api/product/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
    rating,
  } = req.body;
  const files = req.files["image"];
  console.log(image);
  const newListImg = [];
  if (files) {
    files?.forEach((element, index) => {
      console.log(element);
      newListImg.push({
        // uid: element.uid,
        src: element.filename,
      });
    });
  }

  console.log(newListImg);
  const product = await Product.create({
    name,
    image: newListImg,
    description,
    category,
    price,
    countInStock,
  });

  // If the user is successfully created then send back user details in response
  if (product) {
    res.status(201).json({
      status: 200,
      data: {
        ...product,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }
});

const getProductEnable = asyncHandler(async (req, res) => {
  const product = await Product.find({ status: 1 });

  if (product) {
    res.json({
      data: product,
    });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

const updateProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.image = req.body.image || product.image;
    product.description = req.body.description || product.description;

    product.category = req.body.category || product.category;
    product.price = req.body.price ?? product.price;
    product.countInStock = req.body.countInStock ?? product.countInStock;
    product.rating = req.body.rating ?? product.rating;
    product.numReviews = req.body.numReviews ?? product.numReviews;
    product.status = req.body.status ?? product.status;

    const productUp = await product.save();

    res.status(201).json({
      status: 200,
      data: productUp,
    });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  getProductEnable,
  updateProductById,
};
