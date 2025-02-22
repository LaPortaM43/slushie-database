// database/customersCRUD.js 

import { pool } from '../db.js';

// Create 
export async function createCustomerCRUD(customerName, customerEmail, customerAddress, customerPassword) {
  try {
    const [result] = await pool.query(`
      INSERT INTO customers (customerName, customerEmail, customerAddress, customerPassword)
      VALUES (?, ?, ?, ?)`, [customerName, customerEmail, customerAddress, customerPassword]);

    if (result.affectedRows === 0) {
      throw new Error("Failed to create customer");
    }
    // Retrieve and return the newly created customer by its generated ID
    return getCustomerByIDCRUD(result.insertId);
  } catch (error) {
    console.error("Error creating customer: ", error);
    throw error;
  }
}

// Read all 
export async function getCustomersCRUD() {
  try {
    const [rows] = await pool.query("SELECT * FROM customers");
    return rows;
  } catch (error) {
      console.error("Error retrieving customers: ", error);
      throw error; // Signal something went wrong and allow a different file to handle it. 
  }
}


// Read by ID
export async function getCustomerByIDCRUD(customerID) {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM customers WHERE customerID = ?`, [customerID]);

    if (rows.length === 0) {
      throw new Error("Customer not found");
    }
    return rows[0];
  } catch (error) {
    console.error("Error getting customer: ", error);
    throw error;
  }
}

// Read by Email
export async function getCustomerByEmailCRUD(customerEmail) {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM customers WHERE customerEmail = ?`, [customerEmail]);

    // Checks if the customer exists, if not, creates a new error that the catch block will handle 
    if (rows.length == 0) {
      throw new Error("Customer not found");
    }
    return rows[0];
  } catch (error) {
      console.error("Error getting customer: ", error);
      throw error;
  }
}

// Update 
export async function updateCustomerCRUD(customerID, customerName, customerEmail, customerAddress, customerPassword) {
  try {
    const [result] = await pool.query(`
      UPDATE customers 
      SET customerName = ?, customerEmail = ?, customerAddress = ?, customerPassword = ?
      WHERE customerID = ?`, [customerName, customerEmail, customerAddress, customerPassword, customerID]);

    if (result.affectedRows == 0) {
      throw new Error("Failed to update customer");
    }
    return getCustomerByIDCRUD(customerID);
  } catch (error) {
      console.error("Error updating customer: ", error);
      throw error;
  }
}

// Delete 
export async function deleteCustomerCRUD(customerID) {
  try {
    const [result] = await pool.query(`
      DELETE FROM customers 
      WHERE customerID = ?`, [customerID]);

    if (result.affectedRows == 0) {
      throw new Error("Failed to delete customer");
    }
    return "Customer deleted";
  } catch (error) {
      console.error("Error deleting customer: ", error);
      throw error;
  }
}


  
  
  