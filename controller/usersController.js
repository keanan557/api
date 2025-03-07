// users controller page

// imports
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import * as usersModal from '../model/usersModel.js'

// login user function
export const loginUser = async (req, res) => {
    const { email, password } = req.body;  // Expecting 'email' and 'password' in the body
  
    try {
      // Check if the user exists by email
      const rows = await usersModal.getUserByEmail(email)
  
      if (rows.length === 0) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      const user = rows[0];
  
      // Validate the password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Generate a JWT token for the user
      const token = jwt.sign(
        { id: user.id, username: user.name, email: user.email,user_id: user.user_id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      // Respond with the token and user details (including name)
      res.json({ token, name: user.name, email: user.email, user_id: user.user_id });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }

// add user
export const addUser =async (req, res) => {
    const { name, email, password } = req.body;
  
    
    try {
      // Check if user already exists
    const [existingUser] = await usersModal.checkIfUser(email)
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }
  
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
  
       const [result]= await usersModal.addUser(name,email,hashedPassword);
  
      // Generate a JWT token
      const token = jwt.sign({ userId: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({
        message: 'Registration successful!',
        token,  // Send token back to the client
      });
    } catch (err) {
      console.error('Error inserting into db:', err);
      res.status(500).json({ error: 'Error inserting into db' });
    }
  }
  
  // delete user controller
export const deleteUser = async(req, res)=>{
  const {email}= req.body

  try{
      const result = await usersModal.deleteUser(email)
      
      if(result.affectedRows === 0){
          return res.status(404).json({error: "User not found"})
      }

      res.json({message: "Account successfully deleted"})
  
  }catch(error){
      console.error("Delete account error:", error)
      res.status(500).json({error: "Database error"})
  }
}

// get user
export const getUser = async (req, res) => {
  try {
      const userId = req.params.id;
      const user = await usersModal.findById(userId);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
  } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};
