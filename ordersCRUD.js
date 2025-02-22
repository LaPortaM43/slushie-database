// database/ordersCRUD.js

import { pool } from '../db.js';

// Create
export async function createOrderCRUD(customerID, branchID, price, deliveryAddress, flavor1ID, flavor2ID, flavor3ID) {
  try {
    const [result] = await pool.query(`
      INSERT INTO orders (customerID, price, deliveryAddress, branchID, flavor1ID, flavor2ID, flavor3ID) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`, 
      [customerID, price, deliveryAddress, branchID, flavor1ID, flavor2ID, flavor3ID]);

    if (result.affectedRows === 0) {
      throw new Error("Failed to create order");
    }
    return getOrderCRUD(result.insertId); // Return the newly created order by its ID
  } catch (error) {
    console.error("Error creating order: ", error);
    throw error;
  }
}

// Read all
export async function getOrdersCRUD() {
  try {
    const [rows] = await pool.query("SELECT * FROM orders");
    return rows;
  } catch (error) {
    console.error("Error reading orders: ", error);
    throw error;
  }
}

// Read by ID
export async function getOrderByIDCRUD(orderID) {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM orders WHERE orderID = ?`, [orderID]);

    if (rows.length === 0) {
      throw new Error("Order not found");
    }
    return rows[0];
  } catch (error) {
    console.error("Error reading order: ", error);
    throw error;
  }
}

// Update
export async function updateOrderCRUD(orderID, customerID, branchID, price, deliveryAddress, flavor1ID, flavor2ID, flavor3ID) {
  try {
    const [result] = await pool.query(`
      UPDATE orders
      SET customerID = ?, branchID = ?, price = ?, deliveryAddress = ?, flavor1ID = ?, flavor2ID = ?, flavor3ID = ?
      WHERE orderID = ?`, 
      [customerID, branchID, price, deliveryAddress, flavor1ID, flavor2ID, flavor3ID, orderID]);

    if (result.affectedRows === 0) {
      throw new Error("Failed to update order or order not found");
    }
    return getOrderCRUD(orderID); // Return the updated order
  } catch (error) {
    console.error("Error updating order: ", error);
    throw error;
  }
}

// Delete
export async function deleteOrderCRUD(orderID) {
  try {
    const [result] = await pool.query(`
      DELETE FROM orders WHERE orderID = ?`, [orderID]);

    if (result.affectedRows === 0) {
      throw new Error("Failed to delete order");
    }
    return "Order deleted";
  } catch (error) {
    console.error("Error deleting order: ", error);
    throw error;
  }
}
