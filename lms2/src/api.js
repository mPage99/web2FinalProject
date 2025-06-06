const API_URL = "http://localhost:8080/api/teams";

/**
 * Fetch all teams from the server
 * @returns {Promise<Array>} - List of teams
 */
export const fetchTeams = async () => {
  try {
    console.log("Calling API:", API_URL); // Log API call
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    console.log("API Response Status:", response.status); // Log response status

    if (!response.ok) {
      throw new Error(`Error fetching teams: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response Data:", data); // Log response data
    return data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};

/**
 * Delete a team by its ID
 * @param {number} id - ID of the team to delete
 */
export const deleteTeam = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error deleting team with ID ${id}: ${response.statusText}`);
    }

    console.log(`Team with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting team with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Add a new team
 * @param {Object} team - Team object to add
 * @returns {Promise<Object>} - The added team
 */
export const addTeam = async (team) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(team),
    });

    if (!response.ok) {
      throw new Error(`Error adding team: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Team added successfully:", data);
    return data;
  } catch (error) {
    console.error("Error adding team:", error);
    throw error;
  }
};

/**
 * Update a team by its ID
 * @param {number} id - ID of the team to update
 * @param {Object} team - Updated team object
 * @returns {Promise<Object>} - The updated team
 */
export const updateTeam = async (id, team) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(team),
    });

    if (!response.ok) {
      throw new Error(`Error updating team with ID ${id}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Team updated successfully:", data);
    return data;
  } catch (error) {
    console.error(`Error updating team with ID ${id}:`, error);
    throw error;
  }
};
