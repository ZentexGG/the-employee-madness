const mongoose = require("mongoose");

const { Schema } = mongoose;

const TypeSchema = new Schema({
  name: String
});

module.exports = mongoose.model("Type", TypeSchema);
