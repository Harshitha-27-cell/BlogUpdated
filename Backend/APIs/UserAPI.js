import exp from "express";
import { register } from "../services/authService.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import { UserTypeModel } from "../models/UserModel.js";

export const userRoute = exp.Router();

// register user
userRoute.post("/users", upload.single("profileImageUrl"), async (req, res, next) => {
  let cloudinaryResult;

  try {
    let userObj = req.body;

    if (req.file) {
      cloudinaryResult = await uploadToCloudinary(req.file.buffer);
    }

    const newUserObj = await register({
      ...userObj,
      role: "USER",
      profileImageUrl: cloudinaryResult?.secure_url,
    });

    res.status(201).json({
      message: "user created",
      payload: newUserObj,
    });
  } catch (err) {
    if (cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }

    next(err);
  }
});

// get all articles
userRoute.get("/articles", verifyToken("USER"), async (req, res) => {
  const articles = await ArticleModel.find({ isArticleActive: true })
    .populate("comments.user", "email firstName");

  res.status(200).json({ message: "all articles", payload: articles });
});

// add comment
userRoute.post("/article/:id/comment", verifyToken("USER"), async (req, res) => {
  try {
    const articleId = req.params.id;
    const { comment } = req.body;

    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      articleId,
      {
        $push: {
          comments: {
            user: req.user.userId,
            comment,
          },
        },
      },
      { new: true }
    ).populate("comments.user", "email firstName");

    if (!updatedArticle) {
      return res.status(404).json({ message: "article not found" });
    }

    res.status(200).json({
      message: "comment added",
      payload: updatedArticle,
    });
  } catch (err) {
    res.status(500).json({ message: "failed to add comment" });
  }
});

// save/unsave article
userRoute.post("/article/:id/save", verifyToken("USER", "AUTHOR"), async (req, res) => {
  try {
    const articleId = req.params.id;
    const userId = req.user.userId;

    const user = await UserTypeModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isSaved = user.savedArticles.some((id) => id.toString() === articleId);

    if (isSaved) {
      // Unsave
      user.savedArticles = user.savedArticles.filter(
        (id) => id.toString() !== articleId
      );
    } else {
      // Save
      user.savedArticles.push(articleId);
    }

    await user.save();

    res.status(200).json({
      message: isSaved ? "Article unsaved" : "Article saved",
      isSaved: !isSaved,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to toggle save article" });
  }
});
