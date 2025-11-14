import Farm from "../models/Farm.js";

// ➕ Add new farm
export const addFarm = async (req, res) => {
  try {
    const { farmName, location, cropType, size } = req.body;

    const newFarm = new Farm({
      userId: req.user.id,
      farmName,
      location,
      cropType,
      size
    });

    await newFarm.save();
    res.json({ message: "Farm added successfully 🌾", farm: newFarm });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Get all farms for user
export const getFarms = async (req, res) => {
  try {
    const farms = await Farm.find({ userId: req.user.id });
    res.json(farms);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Update farm
export const updateFarm = async (req, res) => {
  try {
    const farm = await Farm.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!farm) return res.status(404).json({ message: "Farm not found ❌" });

    res.json({ message: "Farm updated successfully 🌿", farm });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ Delete farm
export const deleteFarm = async (req, res) => {
  try {
    const result = await Farm.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!result) return res.status(404).json({ message: "Farm not found ❌" });

    res.json({ message: "Farm deleted successfully 🗑️" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
