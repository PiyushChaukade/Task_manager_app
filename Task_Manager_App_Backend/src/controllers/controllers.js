const tasks = require("../Data/tasks");

//create task
const createtask = (req, res) => {
  try {
    const newtask = { ...req.body, task_id: tasks.length + 1 };
    tasks.push(newtask);
    res.status(201).json(newtask);
  } catch (err) {
    res
      .status(500)
      .json({ message: "internal server Error", error: err.message });
  }
};

// fetch all tasks
const getAllTasks = (req, res) => {
  res.json(tasks);
};

// Fetch task by id
const getTaskById = (req, res) => {
  try {
    const task = tasks.find((id) => id.task_id === parseInt(req.params.id));

    if (!task) return res.status(404).json({ message: "task not found" });
    res.json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "internal server error", error: err.message });
  }
};
// update task by ID
const updateTask = (req, res) => {
  try {
    const task = tasks.find((id) => id.task_id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: "Task not found" });
    Object.assign(task, req.body);
    res.json(task);
  } catch (err) {}
};

// Delete the task by id
const deleteTask = (req, res) => {
  try {
    const taskIndex = tasks.findIndex(
      (id) => id.task_id === parseInt(req.params.id)
    );
    if (taskIndex === -1)
      return res.status(404).json({ message: "Task not found" });
    const Deletedtask = tasks.splice(taskIndex, 1);
    res.json(Deletedtask);
  } catch (err) {
    res
      .status(500)
      .json({ message: "inernal server error", error: err.message });
  }
};

module.exports = {
  createtask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
