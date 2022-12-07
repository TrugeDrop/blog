const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    blog_id: {
        type: String,
        reuired: true
    }
}, { timestamps: true });

module.exports = mongoose.models.Comments || mongoose.model("Comments", Schema);