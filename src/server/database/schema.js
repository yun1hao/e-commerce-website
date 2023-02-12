//setup schema => setup model =>use model you create to add, delete in your database..

const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // default: "",
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  Cart: {
    type: Array,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
module.exports = ProjectSchema;
