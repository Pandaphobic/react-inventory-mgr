const express = require("express");
const router = express.Router();

// Get All
router.get("/", (req, res) => {
  res.send("hello world");
});
// Get Single
router.get("/:id", (req, res) => {});
// Create Single
router.post("/", (req, res) => {});
// Update Single
router.patch("/:id", (req, res) => {});
// Delete Single
router.delete("/:id", (req, res) => {});

module.exports = router;
