const express = require("express");
const Restaurant = require("../models/Restaurant");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
    try {
        const { sortBy } = req.query;
        const sortOrder = sortBy === "DESC" ? -1 : 1; // Sorting Order
    
        const restaurants = await Restaurant.find({}, "cuisine name")
            .sort({ _id: sortOrder }); // Sort by _id instead
    
        if (!restaurants.length) {
            return res.status(404).json({ message: "No restaurants found" });
        }
    
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  });
  

router.get("/cuisine/:cuisine", async (req, res) => {
    try {
      const { cuisine } = req.params;
      const restaurants = await Restaurant.find({ cuisine: cuisine });
      if (restaurants.length === 0) {
        return res.status(404).json({ message: "No restaurants found for this cuisine" });
      }
      res.status(200).json(restaurants);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.put("/:id", async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Restaurant deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/Delicatessen", async (req, res) => {
    try {
        const restaurants = await Restaurant.find(
            { cuisine: "Delicatessen", city: { $ne: "Brooklyn" } }, // Filter by Delicatessen and exclude Brooklyn
            "cuisine name city" // Only return these columns: cuisine, name, city (exclude id)
        )
        .sort({ name: 1 }); // Sort by name in ascending order
    
        if (restaurants.length === 0) {
            return res.status(404).json({ message: "No restaurants found matching the criteria" });
        }
    
        res.status(200).json(restaurants); // Return the results
        } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
