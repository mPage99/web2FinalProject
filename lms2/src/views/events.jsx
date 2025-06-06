import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";

const API_URL = "http://localhost:8080/api/events";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
    event_name: "",
    event_description: "",
    date: "",
    location: "",
    team_id: null,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleSave = async () => {
    const method = currentEvent.id ? "PUT" : "POST";
    const url = currentEvent.id ? `${API_URL}/${currentEvent.id}` : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentEvent),
      });
      if (response.ok) {
        fetchEvents();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="container-fluid" style={{ marginTop: 10 }}>
      <h2>Events</h2>
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Add Event
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Location</th>
            <th>Team</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.event_name}</td>
              <td>{event.event_description}</td>
              <td>{event.date}</td>
              <td>{event.location}</td>
              <td>{event.team_id || "N/A"}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setCurrentEvent(event);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(event.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentEvent.id ? "Edit Event" : "Add Event"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                value={currentEvent.event_name}
                onChange={(e) => setCurrentEvent({ ...currentEvent, event_name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentEvent.event_description}
                onChange={(e) => setCurrentEvent({ ...currentEvent, event_description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={currentEvent.date}
                onChange={(e) => setCurrentEvent({ ...currentEvent, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={currentEvent.location}
                onChange={(e) => setCurrentEvent({ ...currentEvent, location: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Team ID</Form.Label>
              <Form.Control
                type="number"
                value={currentEvent.team_id || ""}
                onChange={(e) => setCurrentEvent({ ...currentEvent, team_id: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
