// Contact Controller

// import
import * as contactModal from '../model/contactModal.js'

// fetch
export const fetchContact = async(req,res)=>{
    try{
        const contact = await contactModal.fetchContact()
        res.status(200).json(contact)
        
    }catch(error){
        console.error('Error Cant fetch Contact', error)
    }
}

// add
export const addContact =async(req,res)=>{
    const {name,email,message} = req.body
    try{
        const contact = await contactModal.addContact(name,email,message)
        res.json({message : 'Contact successfully added'})
    }catch(error){
        console.error('Error cant add contact', error)
    }
}

// delete
export const deleteContact = async(req,res)=>{
    try{
        const {id} = req.params
        const contact = await contactModal.deleteContact(id) 
        res.json({message: 'Contact successfully deleted'})
    }catch(error){
        console.error('Error fetching contact', error)
    }
}