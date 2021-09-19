require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// from .env file
const port = process.env.PORT || 8000;

mongoose.connect(process.env.URI);
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log(`Connected to Database`));

app.use(express.json);

const itemsRouter = require("./routes/items");
app.use("/", itemsRouter);

app.listen(3000, () => {
  console.log(`Server started on port: ${port}`);
});
