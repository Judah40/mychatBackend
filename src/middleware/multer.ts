// middleware/multer.ts
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request, Response, NextFunction } from "express";

const multerConfig = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 * 2 }, // 5MB
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(new Error("Invalid file type. Only jpeg, jpg, png, gif are allowed"));
  },
});

export const multerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const upload = multerConfig.single("file");

  upload(req, res, (err: unknown) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(413).json({
            success: false,
            message: "File too large. Maximum size is 5MB",
          });
        }
        return res.status(400).json({
          success: false,
          message: `Upload error: ${err.message}`,
        });
      }

      // File filter error
      return res.status(400).json({
        success: false,
        message: (err as Error).message,
      });
    }

    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    next();
  });
};
