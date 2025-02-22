// database/flavorsCRUD.js 

import { pool } from '../db.js';

// Create
export async function createFlavorCRUD(flavorName) {
  try {
    const [result] = await pool.query(`
      INSERT INTO flavors (flavorName) 
      VALUES (?)`, [flavorName]);

    if (result.affectedRows === 0) {
      throw new Error("Failed to create flavor");
    }
    return getFlavorByIDCRUD(result.insertId);
  } catch (error) {
    console.error("Error creating flavor: ", error);
    throw error;
  }
}

// Read all
export async function getFlavorsCRUD() {
  try {
    const [rows] = await pool.query("SELECT * FROM flavors");
    return rows;
  } catch (error) {
    console.error("Error retrieving flavors: ", error);
    throw error;
  }
}

// Read by ID
export async function getFlavorByIDCRUD(flavorID) {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM flavors WHERE flavorID = ?`, [flavorID]);

    if (rows.length === 0) {
      throw new Error("Flavor not found");
    }
    return rows[0];
  } catch (error) {
    console.error("Error retrieving flavor: ", error);
    throw error;
  }
}

// Update
export async function updateFlavorCRUD(flavorID, flavorName) {
  try {
    const [result] = await pool.query(`
      UPDATE flavors
      SET flavorName = ?
      WHERE flavorID = ?`, [flavorName, flavorID]);

    if (result.affectedRows === 0) {
      throw new Error("Failed to update flavor");
    }
    return getFlavorByIDCRUD(flavorID);
  } catch (error) {
    console.error("Error updating flavor: ", error);
    throw error;
  }
}

// Delete
export async function deleteFlavorCRUD(flavorID) {
  try {
    const [result] = await pool.query(`
      DELETE FROM flavors
      WHERE flavorID = ?`, [flavorID]);

    if (result.affectedRows === 0) {
      throw new Error("Failed to delete flavor");
    }
    return "Flavor deleted";
  } catch (error) {
    console.error("Error deleting flavor: ", error);
    throw error;
  }
}
