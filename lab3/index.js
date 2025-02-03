const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const restaurantRoutes = require('./routes/restaurantRoutes');

dotenv.config();
const app = express();

app.use(express.json());

app.use('/restaurants', restaurantRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Failed:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
