// database/branchesCRUD.js

import { pool } from '../db.js';

// Create
export async function createBranchCRUD(branchName, branchAddress) {
  try {
    const [result] = await pool.query(`
      INSERT INTO branches (branchName, branchAddress) 
      VALUES (?, ?)`, [branchName, branchAddress]);

    if (result.affectedRows === 0) {
      throw new Error("Failed to create branch");
    }
    // Retrieve and return the newly created branch by its generated ID
    return getBranchbyIDCRUD(result.insertId);
  } catch (error) {
    console.error("Error creating branch: ", error);
    throw error;
  }
}

// Read all 
export async function getBranchesCRUD() { 
  try { 
    const [rows] = await pool.query("SELECT * FROM branches");
    return rows; 
  } catch (error) { 
    console.error("Error reading branches: ", error); 
    throw error; 
  }
}

// Read by ID 
export async function getBranchByIDCRUD(branchID) { 
  try { 
    const [rows] = await pool.query(`
      SELECT * FROM branches WHERE branchID = ?`, [branchID]);

    if (rows.length === 0) { 
      throw new Error("Branch not found");
    }
    return rows[0]; 
  } catch (error) { 
    console.error("Error reading branch: ", error);
    throw error; 
  } 
}

// Update
export async function updateBranchCRUD(branchID, branchName, branchAddress) {
  try {
    const [result] = await pool.query(`
      UPDATE branches 
      SET branchName = ?, branchAddress = ? 
      WHERE branchID = ?`, [branchName, branchAddress, branchID]);

    if (result.affectedRows === 0) {
      throw new Error("Failed to update branch");
    }
    return getBranch(branchID);
  } catch (error) {
    console.error("Error updating branch: ", error);
    throw error;
  }
}

// Delete
export async function deleteBranchCRUD(branchID) {
  try {
    const [result] = await pool.query(`
      DELETE FROM branches 
      WHERE branchID = ?`, [branchID]);

    if (result.affectedRows === 0) {
      throw new Error("Failed to delete branch");
    }
    return "Branch deleted";
  } catch (error) {
    console.error("Error deleting branch: ", error);
    throw error;
  }
}
