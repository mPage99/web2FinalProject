import React, { useState } from "react";
import { Button, Form, Card, Alert } from "react-bootstrap";

const API_URL = "http://localhost:8080/api/players";

export default function PlayerProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginCredentials, setLoginCredentials] = useState({
    user_name: "",
    password: "",
  });
  const [player, setPlayer] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Handle login
  const handleLogin = async () => {
    try {
      const response = await fetch(
        `${API_URL}?user_name=${loginCredentials.user_name}&password=${loginCredentials.password}`
      );
      const data = await response.json();

      if (response.ok && data.length > 0) {
        setPlayer(data[0]); // Assuming API returns a single player object in an array
        setIsLoggedIn(true);
        setLoginError("");
      } else {
        setLoginError("Invalid username or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("An error occurred while trying to log in.");
    }
  };

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${API_URL}/${player.id}/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const updatedPlayer = await response.json();
        setPlayer(updatedPlayer);
        setIsUploading(false);
      } else {
        setUploadError("Failed to upload image. Please try again.");
        setIsUploading(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError("An error occurred while uploading the image.");
      setIsUploading(false);
    }
  };

  // Render login form
  const renderLoginForm = () => (
    <div className="login-form">
      <Card className="p-3">
        <h3>Login</h3>
        {loginError && <Alert variant="danger">{loginError}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={loginCredentials.user_name}
              onChange={(e) => setLoginCredentials({ ...loginCredentials, user_name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={loginCredentials.password}
              onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );

  // Render player profile
  const renderPlayerProfile = () => (
    <div className="player-profile">
      <Card className="p-3">
        <h3>
          Welcome, {player.first_name} {player.last_name}
        </h3>
        {player.logo_path ? (
          <img
            src={`http://localhost:8080${player.logo_path}`} // Include the full URL to the image
            alt={`${player.first_name} ${player.last_name}`}
            style={{ width: "150px", borderRadius: "50%", marginBottom: "20px" }}
          />
        ) : (
          <p>No profile image uploaded.</p>
        )}
        <p>
          <strong>Address:</strong> {player.address1}, {player.city}, {player.state}, {player.zip}
        </p>
        <p>
          <strong>Email:</strong> {player.email}
        </p>
        <p>
          <strong>Phone:</strong> {player.phone}
        </p>
        <p>
          <strong>Team ID:</strong> {player.team_id}
        </p>
        <Form.Group className="mb-3">
          <Form.Label>Upload Profile Image</Form.Label>
          <Form.Control type="file" onChange={handleImageUpload} />
        </Form.Group>
        {isUploading && <Alert variant="info">Uploading image...</Alert>}
        {uploadError && <Alert variant="danger">{uploadError}</Alert>}
      </Card>
    </div>
  );

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      {!isLoggedIn ? renderLoginForm() : renderPlayerProfile()}
    </div>
  );
}
