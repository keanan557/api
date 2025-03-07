import bcrypt from "bcryptjs"
import { getUserByEmail, updateUserPassword } from "../model/usersModel.js"

export const resetPassword = async(req,res)=>{
    const {email, newPassword } = req.body
  
    if(!email || !newPassword){
      return res.status(400).json({error: 'Email and new Password required'})
    }
  
    try{
      const [rows] = await getUserByEmail(email)
      if(rows.length === 0){
        return res.status(400).json({error: 'No user found with that email'})
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10)
      // update the user password
      await updateUserPassword(hashedPassword,email)
  
      res.json({message: 'Password reset successful'})
    }catch(error){
      console.error('Error resetting password:', error)
      res.status(500).json({error: 'Server error' })
    }
  }
