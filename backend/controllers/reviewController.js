const asyncHandler = require("express-async-handler");
const Review = require("../models/reviewModel");

// @desc        Get reviews
// @route       /api/reviews/
// @access      PUBLIC
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });

  res.json(reviews);
});

// @desc        Create review
// @route       /api/reviews/create
// @access      PRIVATE
const createReview = asyncHandler(async (req, res) => {
  try {
    const { company, text } = req.body;

    if (!company) {
      req.status(400);
      throw new Error("Missing company field");
    }

    if (!text) {
      req.status(400);
      throw new Error("Missing text field");
    }

    await Review.create({
      company: company,
      text: text,
      user: req.user._id,
      name: req.user.name,
    });

    res.json({
      success: true,
      message: "Review has been added",
    });
  } catch (err) {
    console.log(err.message);
    res.status(400);
    throw new Error(err.message);
  }
});

module.exports = {
  getReviews,
  createReview,
};
