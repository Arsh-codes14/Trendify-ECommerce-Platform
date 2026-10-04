import multer from "multer";

// INFO: Keep uploads in memory; they are streamed straight to Supabase Storage.
// Images only, max 5 MB each.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith("image/")) return callback(null, true);
    const error = new Error("Only image files are allowed");
    error.status = 400;
    error.expose = true;
    callback(error);
  },
});

export default upload;
