const express = require("express");

const {
  addReview,
  getCompanyReviews,
  likeReview,
} = require("../controllers/reviewController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, addReview);

router.get("/company/:companyId", getCompanyReviews);

router.patch("/:id/like", likeReview);

module.exports = router;
