import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

const TaskForm = ({ show, handleClose, user_id, fetchAllData }) => {
  const [task, setTask] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 👈 prevent form from reloading page
  
    const taskData = { ...task, user_id };

    try {
      await axios.post("http://localhost:3000/api/tasks", taskData);
      fetchAllData();
      handleClose();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              onChange={handleChange}
              required
            />
          </Form.Group>
       
          <Button type="submit" variant="primary">
            Add Task here
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskForm;
