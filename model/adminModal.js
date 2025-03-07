// admin modal page

// import
import {pool} from '../config/config.js'

// Fetch admin function
export const fetchAdmin = async()=>{
    const [rows] =await pool.execute('SELECT * FROM admin_users');
    return rows
}
 
// add admin function
export const addAdmin = async(username, hashedPassword, email)=>{
    return await pool.query('INSERT INTO admin_users (username, password, email) VALUES (?, ?, ?)',
        [username, hashedPassword, email]);
}

// Update an admin function
export const updateAdmin = async(id,username,password,email)=>{
    return await pool.execute('UPDATE admin_users SET username=?, password=?, email=? WHERE id=?',
    [username, password, email, id]);
}
  
// Delete admin function
export const deleteAdmin = async(id)=>{
    return await pool.execute('DELETE FROM admin_users WHERE id=?', [id]);
}

// login admin code
export const loginAdmin = async(username)=>{
    const [rows]=await pool.query('SELECT * FROM admin_users WHERE username = ?', [username]);
    return rows
}
