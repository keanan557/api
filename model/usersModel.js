// usersModel.js 
import { pool } from "../config/config.js"

// get user function
export const getUserByEmail = async(email) => {
     const [rows] =await pool.query('select * from users where email = ?',[email])
     return rows
}

// update user function
export const updateUserPassword = async (hashedPassword, email) => {
    try {
        const [result] = await pool.query(
            "UPDATE users SET password_hash = ? WHERE email = ?",
            [hashedPassword, email]
        );

        if (result.affectedRows === 0) {
            throw new Error("User not found or password reset failed");
        }
        return result;
    } catch (error) {
        console.error("Error updating password:", error);
        throw error;
    }
};


// add user
export const addUser = async(name, email, hashedPassword)=>{
    return await pool.query(
        'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
        [name, email, hashedPassword])
}

export const checkIfUser = async(email)=>{
    return await pool.query('SELECT * FROM users WHERE email = ?', [email]);
}


  // delete user modal
  export const deleteUser = async(email)=>{
    const [result] = await pool.execute("delete from users where email = ?", [email])
    return result
  }

// get user by id
export const findById = async (userId) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [userId]);

        if (rows.length === 0) {
            return null; // User not found
        }

        return rows[0]; // Return the first (and only) row
    } catch (error) {
        console.error('Error finding user by ID:', error);
        throw error; // Or return an appropriate error response
    }
};