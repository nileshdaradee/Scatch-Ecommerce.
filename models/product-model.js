const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  data: Buffer,
  name: String,
  contentType:String,
  price: Number,
  discount: {
    type: Number,
    default: 0,
  },
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
});

module.exports = mongoose.model("product", productSchema);
