import React, { useState } from "react";
import { Button, Card, Col, Row, Modal } from "react-bootstrap";
import axios from "axios";

const TaskItem = ({ task, fetchAllData }) => {
  const [show, setShow] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const user_id = localStorage.getItem("user_id");
  const handleDelete = async () => {
    await axios.delete(
      `http://localhost:3000/api/tasks/${task.task_id}?user_id=${user_id}`
    );
    fetchAllData();
  };

  const handleUpdate = async () => {
    await axios.put(
      `http://localhost:3000/api/tasks/${task.task_id}?user_id=${user_id}`,
      editedTask
    );
    setShow(false);
    fetchAllData();
  };

  return (
    <div className="my-2">
      <Card >
        <Card.Body>
          <Row >
            <Col className="mb-3">
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>{task.description}</Card.Text>
            </Col>
            <Col className="mb-3">
              <Button variant="warning" className="me-2" onClick={() => setShow(true)}>
                Edit
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Col>
          </Row>
         
        </Card.Body>
      </Card>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            className="form-control"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="form-control mt-3"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskItem;
