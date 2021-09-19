const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
  "Listing Date": {
    type: String,
    required: true
  },
  "Listing SKU": {
    type: String,
    required: true
  },
  "Item SKU": {
    type: String,
    required: true
  },
  "Listing Title": {
    type: String,
    required: true
  },
  Department: {
    type: String,
    required: true
  },
  Category: {
    type: String,
    required: true
  },
  Subcategory: {
    type: String,
    required: false
  },
  Brand: {
    type: String,
    required: true
  },
  Color: {
    type: String,
    required: true
  },
  Size: {
    type: String,
    required: true
  },
  "Quantity Available": {
    type: Number,
    required: true
  },
  "Cost Price": {
    type: Number,
    required: true
  },
  "Lowest Listed Price": {
    type: Number,
    required: false
  },
  "Current Listing Price": {
    type: Number,
    required: true
  },
  "Other Info": {
    type: String,
    required: false
  },
  "Seller Shipping Discount": {
    type: String,
    required: false
  }
})

module.exports = mongoose.model("Item", itemSchema)
