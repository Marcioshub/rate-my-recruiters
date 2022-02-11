const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
    },
    text: {
      type: String,
      required: [true, "Text is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

reviewSchema.index(
  {
    user: 1,
    company: 1,
  },
  { unique: true }
);

module.exports = mongoose.model("Review", reviewSchema);
