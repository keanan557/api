// orders controller page

// imports
import * as ordersModel from '../model/ordersModel.js'
// import jwt from 'jsonwebtoken'

export const addToOrders = async (req, res) => {
    console.log("Request Body:", req.body); 
    console.log("Request Headers:", req.headers);


    const { user_id, items, total_price, shipping_address, payment_method } = req.body;
  
    if (!user_id) return res.status(401).json({ error: "Unauthorized" });
  
    try {
      const result = await ordersModel.addToOrders(
        user_id,
        items,
        total_price,
        shipping_address,
        payment_method
      );
  
      res.json({ message: "Order placed successfully", order_id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// get orders controller

export const getOrders = async(req,res)=>{
    try{
        const orders = await ordersModel.getOrders()
        res.json(orders)
    }catch(error){
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders.' });
    }
}

// delete orders controller

export const deleteOrders = async(req,res)=>{

  try{
    const {id} = req.params
    const orders = await ordersModel.deleteOrders(id)
    res.json(orders)
  }catch(error){
    console.error('Error deleting orders:',error)
  }
}

// get user orders
export const getUserOrders =async (req, res) => {
  try {
    // Assuming req.user contains the authenticated user's data
    const userId = req.user.user_id; // Or however you store the user ID

    // Query your database to fetch orders for the specific user
    const orders = await ordersModel.getOrdersForUser(userId)

    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).send("Error fetching orders.");
  }
}

// ordersController.js
export const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    // Add code to update the order status or delete the order from your database
    // Example using Sequelize:
    // await Order.destroy({ where: { order_id: orderId, user_id: req.user.user_id } });
    res.json({ message: "Order canceled successfully." });
  } catch (error) {
    console.error("Error canceling order:", error);
    res.status(500).json({ error: "Failed to cancel order." });
  }
};