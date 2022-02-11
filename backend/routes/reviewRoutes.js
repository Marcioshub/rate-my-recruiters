const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getReviews, createReview } = require("../controllers/reviewController");

router.get("/", getReviews);
router.post("/create", protect, createReview);

module.exports = router;
