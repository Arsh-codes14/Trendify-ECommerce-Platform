import crypto from "crypto";
import path from "path";
import validator from "validator";
import supabase, { STORAGE_BUCKET } from "../config/supabase.js";
import { toProduct } from "../models/mappers.js";

// INFO: Upload an image buffer to Supabase Storage and return its public URL
const uploadImage = async (file) => {
  const extension = path.extname(file.originalname).toLowerCase() || ".jpg";
  const objectPath = `products/${crypto.randomUUID()}${extension}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(objectPath, file.buffer, { contentType: file.mimetype, upsert: false });
  if (error) throw error;

  return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(objectPath).data.publicUrl;
};

// INFO: Route for adding a product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

    const files = req.files || {};
    const productImages = ["image1", "image2", "image3", "image4"]
      .map((field) => files[field]?.[0])
      .filter(Boolean);

    let parsedSizes;
    try {
      parsedSizes = JSON.parse(sizes || "[]");
    } catch {
      parsedSizes = [];
    }

    // INFO: Validate input before uploading anything
    if (!name?.trim() || !description?.trim() || !category || !subCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all product details" });
    }
    if (!(Number(price) > 0)) {
      return res.status(400).json({ success: false, message: "Price must be greater than 0" });
    }
    if (!Array.isArray(parsedSizes) || parsedSizes.length === 0) {
      return res.status(400).json({ success: false, message: "Select at least one size" });
    }
    if (productImages.length === 0) {
      return res.status(400).json({ success: false, message: "Upload at least one image" });
    }

    const imageUrls = await Promise.all(productImages.map(uploadImage));

    const { error } = await supabase.from("products").insert({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      category,
      sub_category: subCategory,
      sizes: parsedSizes,
      best_seller: bestSeller === "true",
      image: imageUrls,
    });
    if (error) throw error;

    res.status(201).json({ success: true, message: "Product added" });
  } catch (error) {
    console.log("Error while adding product: ", error);
    res.status(500).json({ success: false, message: "Could not add product" });
  }
};

// INFO: Route for fetching all products
const listProducts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;

    res.status(200).json({ success: true, products: data.map(toProduct) });
  } catch (error) {
    console.log("Error while fetching all products: ", error);
    res.status(500).json({ success: false, message: "Could not fetch products" });
  }
};

// INFO: Route for removing a product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    if (!validator.isUUID(String(id ?? ""))) {
      return res.status(400).json({ success: false, message: "Invalid product id" });
    }

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;

    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log("Error while removing product: ", error);
    res.status(500).json({ success: false, message: "Could not remove product" });
  }
};

// INFO: Route for fetching a single product
const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!validator.isUUID(String(productId ?? ""))) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .maybeSingle();
    if (error) throw error;

    if (!data) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product: toProduct(data) });
  } catch (error) {
    console.log("Error while fetching single product: ", error);
    res.status(500).json({ success: false, message: "Could not fetch product" });
  }
};

export { addProduct, listProducts, removeProduct, getSingleProduct };
