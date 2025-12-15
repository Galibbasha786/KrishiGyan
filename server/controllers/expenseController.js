// controllers/expenseController.js
import Expense from "../models/Expense.js";

export const addExpense = async (req, res) => {
  try {
    const { category, item, amount, date, description, farmId } = req.body;

    if (!category || !item || amount === undefined || amount === null || !date) {
      return res.status(400).json({ message: "Category, item, amount, and date are required" });
    }

    const expense = await Expense.create({
      userId: req.user.userId,
      farmId: farmId || null,
      category,
      item,
      amount,
      date,
      description: description || "",
    });

    res.status(201).json({ message: "Expense added", expense });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Error adding expense", error: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.userId }).sort({ date: -1, createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Error fetching expenses", error: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense updated", expense });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Error updating expense", error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Error deleting expense", error: error.message });
  }
};

