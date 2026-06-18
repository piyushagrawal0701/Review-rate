const Review = require("../models/Review");
const Company = require("../models/Company");

const recalculateCompanyRating = async (companyId) => {
  const reviews = await Review.find({ companyId });

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews === 0
      ? 0
      : reviews.reduce(
          (acc, curr) => acc + curr.rating,
          0
        ) / totalReviews;

  await Company.findByIdAndUpdate(companyId, {
    averageRating: Number(
      averageRating.toFixed(1)
    ),
    totalReviews,
  });
};

const addReview = async (req, res) => {
  try {
    const {
      companyId,
      fullName,
      subject,
      reviewText,
      rating,
    } = req.body;

    if (
      !companyId ||
      !fullName ||
      !subject ||
      !reviewText ||
      !rating
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const company = await Company.findById(
      companyId
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    const review = await Review.create({
      companyId,
      fullName,
      subject,
      reviewText,
      rating,
    });

    await recalculateCompanyRating(companyId);

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCompanyReviews = async (
  req,
  res
) => {
  try {
    const { companyId } = req.params;
    const { sort } = req.query;

    let sortOption = {
      createdAt: -1,
    };

    if (sort === "rating") {
      sortOption = {
        rating: -1,
      };
    }

    if (sort === "oldest") {
      sortOption = {
        createdAt: 1,
      };
    }

    const reviews = await Review.find({
      companyId,
    }).sort(sortOption);

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const likeReview = async (req, res) => {
  try {
    const review =
      await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.likes += 1;

    await review.save();

    res.status(200).json({
      success: true,
      message: "Review liked",
      likes: review.likes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addReview,
  getCompanyReviews,
  likeReview,
};