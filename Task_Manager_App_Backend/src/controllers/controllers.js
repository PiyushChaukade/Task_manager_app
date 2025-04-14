const tasks = require("../Data/tasks");

// CREATE task
const createtask = (req, res) => {
  try {
   
    const newtask = {
      ...req.body,
      task_id: tasks.length + 1,
    };
    tasks.push(newtask);

    res.status(201).json(newtask);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// GET all tasks for a user
const getAllTasks = (req, res) => {
  const userId = parseInt(req.query.user_id);

  const userTasks = tasks.filter((task) => {

    return task.user_id == userId;
  });


  res.json(userTasks);
};

// GET task by ID
const getTaskById = (req, res) => {
  try {
    const task = tasks.find(
      (t) =>
        t.task_id == parseInt(req.params.id) &&
        t.user_id == parseInt(req.query.user_id)
    );

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// UPDATE task
const updateTask = (req, res) => {
  try {



    const task = tasks.find(
      (t) =>
        t.task_id == parseInt(req.params.id) &&
        t.user_id == parseInt(req.body.user_id)
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    Object.assign(task, req.body);
    res.json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// DELETE task
const deleteTask = (req, res) => {
  try {
    const index = tasks.findIndex((t) => {

      return (
        t.task_id == parseInt(req.params.id) &&
        t.user_id == parseInt(req.query.user_id)
      );
    });

    if (index === -1)
      return res.status(404).json({ message: "Task not found" });

    const deleted = tasks.splice(index, 1);
    res.json(deleted);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

module.exports = {
  createtask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
