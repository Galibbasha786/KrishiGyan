// controllers/incomeController.js
import Income from "../models/Income.js";

export const getIncome = async (req, res) => {
  try {
    const existing = await Income.findOne({ userId: req.user.userId });
    if (!existing) {
      return res.json({ cropSales: 0, otherIncome: 0 });
    }
    res.json({ cropSales: existing.cropSales, otherIncome: existing.otherIncome });
  } catch (error) {
    console.error("Error fetching income:", error);
    res.status(500).json({ message: "Error fetching income", error: error.message });
  }
};

export const saveIncome = async (req, res) => {
  try {
    const { cropSales = 0, otherIncome = 0 } = req.body;

    const updated = await Income.findOneAndUpdate(
      { userId: req.user.userId },
      { cropSales, otherIncome },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({
      message: "Income saved",
      income: { cropSales: updated.cropSales, otherIncome: updated.otherIncome },
    });
  } catch (error) {
    console.error("Error saving income:", error);
    res.status(500).json({ message: "Error saving income", error: error.message });
  }
};


