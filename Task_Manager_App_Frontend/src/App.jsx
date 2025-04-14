import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter as Router,Navigate  } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";
import Login from './Components/Auth/Login.jsx';
import Register from './Components/Auth/Register';
import TaskList from "./Components/Tasks/TaskList";
import TaskForm from "./Components/Tasks/TaskForm";
import Logout from './Components/Auth/Logout'
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const user_id = localStorage.getItem("user_id");

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    const user_id = localStorage.getItem("user_id"); // <-- get user_id

    if (token && user_id) {
      if (token) {
        const res = await axios.get(
          `http://localhost:3000/api/tasks?user_id=${user_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTasks(res.data);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Router>
      <Container>
        <Routes>
        <Route path="/" element={<Navigate to="/register" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/tasks"
            element={
              <> 
                 <h1>Welcome to Task Manager</h1>
                <Button onClick={() => setShowForm(true)} variant="primary">
                  Add Task
                </Button>
                <TaskList tasks={tasks} fetchAllData={fetchTasks} />
                <TaskForm
                  fetchAllData={fetchTasks}
                  show={showForm}
                  handleClose={() => setShowForm(false)}
                  user_id={user_id}
                />
              </>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
