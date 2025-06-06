import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Alert } from "react-bootstrap";

const API_URL = "http://localhost:8080/api/news";

export default function NewsAnnouncements() {
  const [news, setNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date
  });
  const [error, setError] = useState("");

  // Fetch news articles from the API
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (response.ok) {
        setNews(data);
      } else {
        console.error("Error fetching news:", data.message);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleSaveArticle = async () => {
    if (!newArticle.title || !newArticle.content) {
      setError("Title and content are required.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newArticle),
      });

      if (response.ok) {
        fetchNews(); // Refresh the news list
        setShowModal(false);
        setError("");
        setNewArticle({ title: "", content: "", date: new Date().toISOString().split("T")[0] });
      } else {
        console.error("Error saving article:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const renderNewsCards = () =>
    news.map((item) => (
      <Card key={item.id} className="mb-3">
        <Card.Header>
          <strong>{item.title}</strong>
          <small className="text-muted float-end">{new Date(item.date).toLocaleDateString()}</small>
        </Card.Header>
        <Card.Body>
          <Card.Text>{item.content}</Card.Text>
        </Card.Body>
      </Card>
    ));

  return (
    <div className="container mt-4">
      <h2>News and Announcements</h2>
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Add Announcement
      </Button>

      {news.length === 0 ? <Alert variant="info">No news or announcements available.</Alert> : renderNewsCards()}

      {/* Modal for adding a new announcement */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add News or Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter news title"
                value={newArticle.title}
                onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter news content"
                value={newArticle.content}
                onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newArticle.date}
                onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveArticle}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
