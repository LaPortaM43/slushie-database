// database/comboCRUD.js

import { pool } from '../db.js';

// Create
export async function createComboCRUD(customerID, flavor1ID, flavor2ID = null, flavor3ID = null) { 
  try { 
    const [result] = await pool.query(`
      INSERT INTO combo (customerID, flavor1ID, flavor2ID, flavor3ID)
      VALUES (?, ?, ?, ?)`, [customerID, flavor1ID, flavor2ID, flavor3ID]); 

    if (result.affectedRows === 0) { 
      throw new Error("Failed to create combo");
    }
    // Retrieve and return the newly created combo by its generated ID
    return getComboByIDCRUD(result.insertId);
  } catch (error) { 
    console.error("Error creating combo: ", error);
    throw error; 
  } 
}

// Read all
export async function getCombosCRUD() { 
  try { 
    const [rows] = await pool.query("SELECT * FROM combo");
    return rows; 
  } catch (error) { 
    console.error("Error retrieving combos: ", error); 
    throw error; 
  }
}

// Read by ID
export async function getComboByIDCRUD(comboID) { 
  try { 
    const [rows] = await pool.query(`
      SELECT * FROM combo WHERE comboID = ?`, [comboID]); 

    if (rows.length === 0) { 
      throw new Error("Combo not found");
    }
    return rows[0]; 
  } catch (error) { 
    console.error("Error retrieving combo: ", error);
    throw error; 
  } 
}

// Read by Customer ID
export async function getCombosByCustomerIDCRUD(customerID) {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM combo WHERE customerID = ?`, [customerID]);

    if (rows.length === 0) {
      throw new Error("No combos found for this customer");
    }
    return rows;
  } catch (error) {
    console.error("Error retrieving combos by customer ID: ", error);
    throw error;
  }
}

// Update
export async function updateComboCRUD(comboID, flavor1ID, flavor2ID = null, flavor3ID = null) {
  try {
    const [result] = await pool.query(`
      UPDATE combo 
      SET flavor1ID = ?, flavor2ID = ?, flavor3ID = ?
      WHERE comboID = ?`, [flavor1ID, flavor2ID, flavor3ID, comboID]);

    if (result.affectedRows === 0) {
      throw new Error("Failed to update combo");
    }
    return getComboByIDCRUD(comboID);
  } catch (error) {
    console.error("Error updating combo: ", error);
    throw error;
  }
}

// Delete
export async function deleteComboCRUD(comboID) { 
  try { 
    const [result] = await pool.query(`
      DELETE FROM combo
      WHERE comboID = ?`, [comboID]);

    if (result.affectedRows === 0) {
      throw new Error("Failed to delete combo");
    }
    return "Combo deleted"; 
  } catch (error) {
    console.error("Error deleting combo: ", error); 
    throw error;
  }
}
