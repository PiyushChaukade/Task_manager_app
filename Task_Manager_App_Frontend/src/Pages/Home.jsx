import React, { useEffect, useState, useContext } from "react";
import api from '../api';
import TaskList from '../Components/Tasks/TaskList';
import TaskForm from '../Components/Tasks/TaskForm';
import { AuthContext } from "../Context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchTasks = async () => {
    const res = await api.get(`/tasks?user_id=${user.user.id}`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSave = async (taskData) => {
    if (editingTask) {
      await api.put(`/tasks/${editingTask.task_id}`, taskData);
    } else {
      await api.post("/tasks", { ...taskData, user_id: user.user.id });
    }
    fetchTasks();
    setShowModal(false);
    setEditingTask(null);
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`, {
      params: { user_id: user.user.id },
    });
    fetchTasks();
  };

  return (
    <div className="container mt-4">
      <h2>Welcome, {user.user.username}</h2>
      <button
        className="btn btn-primary my-3"
        onClick={() => setShowModal(true)}
      >
        Add Task
      </button>
      <TaskList
        tasks={tasks}
        onEdit={(task) => {
          setEditingTask(task);
          setShowModal(true);
        }}
        onDelete={handleDelete}
      />
      <TaskForm
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingTask(null);
        }}
        onSave={handleSave}
        editingTask={editingTask}
      />
    </div>
  );
};

export default Home;
