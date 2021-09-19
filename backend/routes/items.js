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
router.get("/:id", getItem, (req, res) => {
  res.send(res.item)
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
router.patch("/:id", getItem, async (req, res) => {
  console.log(req.body)
  if (req.body["Listing Date"] != null) {
    res.item["Listing Date"] = req.body["Listing Date"]
  }
  if (req.body["Listing SKU"] != null) {
    res.item["Listing SKU"] = req.body["Listing SKU"]
  }
  if (req.body["Item SKU"] != null) {
    res.item["Item SKU"] = req.body["Item SKU"]
  }
  if (req.body["Listing Title"] != null) {
    res.item["Listing Title"] = req.body["Listing Title"]
  }
  if (req.body["Department"] != null) {
    res.item["Department"] = req.body["Department"]
  }
  if (req.body["Category"] != null) {
    res.item["Category"] = req.body["Category"]
  }
  if (req.body["Subcategory"] != null) {
    res.item["Subcategory"] = req.body["Subcategory"]
  }
  if (req.body.Brand != null) {
    res.item.Brand = req.body.Brand
  }
  if (req.body["Color"] != null) {
    res.item["Color"] = req.body["Color"]
  }
  if (req.body["Size"] != null) {
    res.item["Size"] = req.body["Size"]
  }
  if (req.body["Quantity Available"] != null) {
    res.item["Quantity Available"] = req.body["Quantity Available"]
  }
  if (req.body["Cost Price"] != null) {
    res.item["Cost Price"] = req.body["Cost Price"]
  }
  if (req.body["Lowest Listed Price"] != null) {
    res.item["Lowest Listed Price"] = req.body["Lowest Listed Price"]
  }
  if (req.body["Current Listing Price"] != null) {
    res.item["Current Listing Price"] = req.body["Current Listing Price"]
  }
  if (req.body["Other Info"] != null) {
    res.item["Other Info"] = req.body["Other Info"]
  }
  if (req.body["Seller Shipping Discount"] != null) {
    res.item["Seller Shipping Discount"] = req.body["Seller Shipping Discount"]
  }

  try {
    const updatedItem = await res.item.save()
    res.json(updatedItem)
  } catch (error) {
    res.status(400).json({ message: err.message })
  }
})

// Delete Single
router.delete("/:id", getItem, async (req, res) => {
  try {
    await res.item.remove()
    res.json({ message: "Deleted Item" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getItem(req, res, next) {
  let item
  try {
    item = await Item.findById(req.params.id)
    if (item == null) {
      res.item = req.body
      return res.status(404).json({ message: "Cannot find item" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.item = item
  next()
}

module.exports = router
