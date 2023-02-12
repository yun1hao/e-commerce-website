const mongoose = require("mongoose");
const schemapart = require("./schema");

const user = mongoose.model("user", schemapart);

module.exports = user;
