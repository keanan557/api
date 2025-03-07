// Contact Modal

// import
import { pool } from "../config/config.js";

// fetch
export const fetchContact = async()=>{
    let [contact]= await pool.query('select * from contact')
    return contact
}

// add
export const addContact = async(name,email,message)=>{
    return await pool.query('INSERT INTO contact (name, email, message) VALUES (?, ?, ?)',
        [name, email, message])
}

// delete
export const deleteContact = async(id)=>{
    return await pool.query('delete from contact where contact_id = ?',[id])
}