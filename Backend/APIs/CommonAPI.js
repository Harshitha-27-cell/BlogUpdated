import exp from "express";
import { authenticate } from "../services/authService.js";
import { UserTypeModel } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { verifyToken } from "../middlewares/verifyToken.js";
import { ArticleModel } from "../models/ArticleModel.js";

export const commonRouter = exp.Router();


// LOGIN
commonRouter.post("/login", async (req, res) => {
  try {
    let userCred = req.body;

    let { token, user } = await authenticate(userCred);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60,
    });

    res.status(200).json({
      message: "login success",
      payload: user,
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);

    res.status(err.status || 500).json({
      error: err.message || "Login failed",
    });
  }
});


// LOGOUT
commonRouter.get("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      message: "Logged out successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Logout failed",
    });
  }
});


// CHANGE PASSWORD
commonRouter.put("/change-password", async (req, res) => {
  try {
    const {
      role,
      email,
      currentPassword,
      newPassword,
    } = req.body;

    if (currentPassword === newPassword) {
      return res.status(400).json({
        message:
          "newPassword must be different from currentPassword",
      });
    }

    const account = await UserTypeModel.findOne({
      email,
    });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      account.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    account.password = await bcrypt.hash(
      newPassword,
      10
    );

    await account.save();

    res.status(200).json({
      message: "Password changed successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Password change failed",
    });
  }
});


// CHECK AUTH
commonRouter.get(
  "/check-auth",
  verifyToken("USER", "AUTHOR", "ADMIN"),
  async (req, res) => {
    try {
      const user = await UserTypeModel.findById(
        req.user.userId
      );

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const userObj = user.toObject();

      delete userObj.password;

      res.status(200).json({
        message: "authenticated",
        payload: userObj,
      });

    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: "Auth check failed",
      });
    }
  }
);


// SEARCH ARTICLES
commonRouter.get(
  "/articles/search/:keyword",
  async (req, res) => {
    try {
      const keyword = req.params.keyword;

      console.log("Searching:", keyword);

      const articles = await ArticleModel.find({
        isArticleActive: true,
        $or: [
          {
            title: {
              $regex: keyword,
              $options: "i",
            },
          },
          {
            content: {
              $regex: keyword,
              $options: "i",
            },
          },
        ],
      }).populate(
        "author",
        "firstName email"
      );

      console.log(
        "Articles found:",
        articles.length
      );

      res.status(200).json({
        message: "articles found",
        payload: articles,
      });

    } catch (err) {
      console.log("Search error:", err);

      res.status(500).json({
        error: "Search failed",
      });
    }
  }
);

export default commonRouter;