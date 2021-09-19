const express = require("express")
const router = express.Router()
const Item = require("../models/item")

// Get All
router.get("/", async (req, res) => {
  try {
    const items = await Item.find()
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
// Get Single
router.get("/:id", (req, res) => {
  res.send(req.params.id)
})
// Create Single
router.post("/", async (req, res) => {
  const item = new Item({
    "Listing Date": req.body["Listing Date"],
    "Listing SKU": req.body["Listing SKU"],
    "Item SKU": req.body["Item SKU"],
    "Listing Title": req.body["Listing Title"],
    Department: req.body.Department,
    Category: req.body.Category,
    Subcategory: req.body.Subcategory,
    Brand: req.body.Brand,
    Color: req.body.Color,
    Size: req.body.Size,
    "Quantity Available": req.body["Quantity Available"],
    "Cost Price": req.body["Cost Price"],
    "Lowest Listed Price": req.body["Lowest Listed Price"],
    "Current Listing Price": req.body["Current Listing Price"],
    "Other Info": req.body["Other Info"],
    "Seller Shipping Discount": req.body["Seller Shipping Discount"]
  })

  try {
    const newItem = await item.save()
    res.status(201).json(newItem)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
// Update Single
router.patch("/:id", (req, res) => {})
// Delete Single
router.delete("/:id", (req, res) => {})

module.exports = router
