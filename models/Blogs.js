const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      unique: true
  },
  slug_name: {
      type: String,
      required: true,
      unique: true
  },
  description: {
      type: String,
      required: true
  },
  thumbnail: {
    type: String,
    required: true,
    unique: true
  },
  tags: {
      type: Array,
      required: true
  },
  content: {
      type: String,
      required: true
  },
  sources: {
    type: Array,
    required: true,
    default: []
  },
  views: {
      type: Array,
      default: []
  },
  like: {
      type: Array,
      default: []
  },
  dislike: {
      type: Array,
      default: []
  },
  active: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Blog", Schema);