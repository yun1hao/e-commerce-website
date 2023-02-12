const mongoose = require("mongoose");
const schemapart_product = require("./product-schema");

const product = mongoose.model("product", schemapart_product);

module.exports = product;
