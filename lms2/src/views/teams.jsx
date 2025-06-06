import React, { useState, useEffect } from "react";
import { fetchTeams, deleteTeam, updateTeam, addTeam } from "../api"; // Import API functions
import { Card, OverlayTrigger, Popover, Button, Modal, Form } from "react-bootstrap";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]); // State to hold all team data
  const [showEditModal, setShowEditModal] = useState(false); // State for edit modal visibility
  const [showRegisterModal, setShowRegisterModal] = useState(false); // State for register modal visibility
  const [currentTeam, setCurrentTeam] = useState({}); // State for the team being edited or registered

  // Fetch teams from the API when the component mounts
  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchTeams(); // Fetch data from API
        console.log("Fetched Teams Data:", data);
        setTeams(data); // Set teams from API response
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    loadTeams();
  }, []);

  // Separate teams into amateur and pro based on league_id
  const amateurTeams = teams.filter((team) => team.league_id === 1);
  const proTeams = teams.filter((team) => team.league_id === 2);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await deleteTeam(id); // Call API to delete the team
      setTeams((prev) => prev.filter((team) => team.id !== id)); // Remove from state
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  // Handle edit action
  const handleEdit = (team) => {
    setCurrentTeam(team);
    setShowEditModal(true); // Show edit modal
  };

  const handleEditSubmit = async () => {
    try {
      await updateTeam(currentTeam.id, currentTeam); // Call API to update team
      setTeams((prev) => prev.map((team) => (team.id === currentTeam.id ? currentTeam : team))); // Update the state
      setShowEditModal(false); // Close modal
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };

  // Handle register action
  const handleRegister = () => {
    setCurrentTeam({
      name: "",
      coachName: "",
      coachPhone: "",
      coachEmail: "",
      motto: "",
      notes: "",
    });
    setShowRegisterModal(true); // Show register modal
  };

  const handleRegisterSubmit = async () => {
    try {
      const newTeam = await addTeam(currentTeam); // Call API to add a new team
      setTeams((prev) => [...prev, newTeam]); // Add to state
      setShowRegisterModal(false); // Close modal
    } catch (error) {
      console.error("Error adding team:", error);
    }
  };

  // Generate popover content
  const getTeamSummary = (team) => (
    <Popover id={`popover-${team.id}`}>
      <Popover.Header as="h3">{team.name}</Popover.Header>
      <Popover.Body>
        <strong>Motto:</strong> {team.motto || "No motto provided."}
        <br />
        <strong>Notes:</strong> {team.notes || "No notes available."}
      </Popover.Body>
    </Popover>
  );

  // Render a table for the given teams
  const renderTable = (teams, title) => (
    <div className="mb-4">
      <h3>{title}</h3>
      <table id="my-list" className="table table-dark table-hover mt-2">
        <thead>
          <tr className="trow">
            <th className="bg-black bg-gradient"> Team Name</th>
            <th className="bg-black bg-gradient"> Coach Name</th>
            <th className="bg-black bg-gradient"> Coach Phone</th>
            <th className="bg-black bg-gradient"> Coach Email</th>
            <th className="bg-black bg-gradient"> Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <OverlayTrigger
              key={team.id}
              trigger={["hover", "focus"]}
              placement="auto"
              overlay={getTeamSummary(team)}
              delay={{ show: 300, hide: 200 }}
            >
              <tr>
                <td>{team.name}</td>
                <td>{team.coachName || "Unknown Coach"}</td>
                <td>{team.coachPhone || "N/A"}</td>
                <td>{team.coachEmail || "N/A"}</td>
                <td>
                  <button onClick={() => handleEdit(team)} className="btn btn-primary btn-sm me-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(team.id)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            </OverlayTrigger>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container-fluid" style={{ marginTop: 10 }}>
      <h2>Teams</h2>
      <Button className="mb-3" onClick={handleRegister}>
        Register New Team
      </Button>
      <div className="row">
        <div className="col-md-8">
          {renderTable(amateurTeams, "Amateur Teams")}
          {renderTable(proTeams, "Pro Teams")}
        </div>
        <div className="col-md-4">
          <Card className="text-dark bg-light shadow-sm">
            <Card.Body>
              <Card.Text>
                We currently have <strong>{teams.length} teams</strong> in the league. Stay updated with the latest
                scores, team details, and upcoming events!
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Team Name</Form.Label>
              <Form.Control
                type="text"
                value={currentTeam.name}
                onChange={(e) => setCurrentTeam({ ...currentTeam, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Coach Name</Form.Label>
              <Form.Control
                type="text"
                value={currentTeam.coachName}
                onChange={(e) => setCurrentTeam({ ...currentTeam, coachName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Coach Phone</Form.Label>
              <Form.Control
                type="text"
                value={currentTeam.coachPhone}
                onChange={(e) => setCurrentTeam({ ...currentTeam, coachPhone: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Coach Email</Form.Label>
              <Form.Control
                type="email"
                value={currentTeam.coachEmail}
                onChange={(e) => setCurrentTeam({ ...currentTeam, coachEmail: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Register Modal */}
      <Modal show={showRegisterModal} onHide={() => setShowRegisterModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Register New Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Team Name</Form.Label>
              <Form.Control
                type="text"
                value={currentTeam.name}
                onChange={(e) => setCurrentTeam({ ...currentTeam, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Coach Name</Form.Label>
              <Form.Control
                type="text"
                value={currentTeam.coachName}
                onChange={(e) => setCurrentTeam({ ...currentTeam, coachName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Coach Phone</Form.Label>
              <Form.Control
                type="text"
                value={currentTeam.coachPhone}
                onChange={(e) => setCurrentTeam({ ...currentTeam, coachPhone: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Coach Email</Form.Label>
              <Form.Control
                type="email"
                value={currentTeam.coachEmail}
                onChange={(e) => setCurrentTeam({ ...currentTeam, coachEmail: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRegisterModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRegisterSubmit}>
            Register Team
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
