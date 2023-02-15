// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const ColorSchema = new Schema({
  name: String
});

module.exports = mongoose.model("Color", ColorSchema);
