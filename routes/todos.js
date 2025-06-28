const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// GET all todos
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// POST new todo
router.post("/", async (req, res) => {
  const { text } = req.body;
  const newTodo = new Todo({ text });
  await newTodo.save();
  res.status(201).json(newTodo);
});

// DELETE todo
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// ✅ PUT to update (text and/or completed)
router.put("/:id", async (req, res) => {
  const { text, completed } = req.body;
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    { ...(text !== undefined && { text }), ...(completed !== undefined && { completed }) },
    { new: true }
  );
  res.json(updated);
});

module.exports = router;
