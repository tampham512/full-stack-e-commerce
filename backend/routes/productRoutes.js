import express from "express";
import {
  getProducts,
  getProductById,
  getProductEnable,
  updateProductById,
  createProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadFile.js";
// const upload = require("../middlewares/uploadFile.js");

const router = express.Router();

router.route("/").get(getProducts);

router.route("/:id").get(getProductById);

router.route("/enable").get(getProductEnable);

router.route("/:id").put(protect, updateProductById);

router
  .route("/")
  .post(
    protect,
    upload.fields([{ name: "image", maxCount: 4 }]),
    createProduct
  );

export default router;
