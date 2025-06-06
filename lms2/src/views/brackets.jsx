import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

const API_URL = "http://localhost:8080/api/brackets";

export default function TournamentBrackets() {
  const [brackets, setBrackets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentMatch, setCurrentMatch] = useState({
    team1: "",
    team2: "",
    round: 1,
    winner: null,
  });

  // Fetch brackets from API
  useEffect(() => {
    fetchBrackets();
  }, []);

  const fetchBrackets = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBrackets(data);
    } catch (error) {
      console.error("Error fetching brackets:", error);
    }
  };

  const handleSave = async () => {
    const method = currentMatch.id ? "PUT" : "POST";
    const url = currentMatch.id ? `${API_URL}/${currentMatch.id}` : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentMatch),
      });
      if (response.ok) {
        fetchBrackets();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error saving match:", error);
    }
  };

  // Group matches by round
  const groupedRounds = brackets.reduce((acc, match) => {
    if (!acc[match.round]) acc[match.round] = [];
    acc[match.round].push(match);
    return acc;
  }, {});

  // Render tables for each round
  const renderRoundTables = () =>
    Object.keys(groupedRounds)
      .sort((a, b) => a - b)
      .map((round) => (
        <div key={round} style={{ marginBottom: "20px" }}>
          <h4>Round {round}</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Team 1</th>
                <th>Team 2</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>
              {groupedRounds[round].map((match) => (
                <tr key={match.id}>
                  <td>{match.team1}</td>
                  <td>{match.team2}</td>
                  <td>{match.winner || "TBD"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ));

  return (
    <div className="container">
      <h2>Tournament Brackets</h2>
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Add Match
      </Button>
      {renderRoundTables()}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentMatch.id ? "Edit Match" : "Add Match"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Team 1</Form.Label>
              <Form.Control
                type="text"
                value={currentMatch.team1}
                onChange={(e) => setCurrentMatch({ ...currentMatch, team1: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Team 2</Form.Label>
              <Form.Control
                type="text"
                value={currentMatch.team2}
                onChange={(e) => setCurrentMatch({ ...currentMatch, team2: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Round</Form.Label>
              <Form.Control
                type="number"
                value={currentMatch.round}
                onChange={(e) =>
                  setCurrentMatch({
                    ...currentMatch,
                    round: parseInt(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Winner</Form.Label>
              <Form.Control
                type="text"
                value={currentMatch.winner || ""}
                onChange={(e) => setCurrentMatch({ ...currentMatch, winner: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Match
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
