// admin controller page

// imports
import * as adminModal from '../model/adminModal.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// login admin code
export const adminLogin =async (req, res) => {
  const { username, password } = req.body; // Use email here

  try {
    // Assuming your admin_users table has an email column
    const rows = await adminModal.loginAdmin(username)

    if (rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const admin = rows[0];
    console.log("Admin:", admin, "Provided password:", password);

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({username:admin.username,token: token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

// fetch admin function
export const fetchAdmin =async (req, res) => {
    try {
        const rows = await adminModal.fetchAdmin()
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
}

// Add admin function
export const addAdmin = async (req, res) => {
    const { username, password, email } = req.body;
    console.log(req.body);
    try {
      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(password, 10);
     await adminModal.addAdmin(username,hashedPassword,email)
      res.json({ message: 'Admin user added successfully' });
  } catch (error) {
      console.error('Error adding admin user:', error);
      res.status(500).json({ error: 'Database error' });
  }
}

// update admin
export const updateAdmin =async (req, res) => {
    const { id } = req.params;
    const { username, password, email } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
        await adminModal.updateAdmin(id,username,hashedPassword,email)
        res.json({ message: 'Admin user updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
}

// delete admin user
export const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        await adminModal.deleteAdmin(id)
        res.json({ message: 'Admin user deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
  }


