import itemcollection from "./item.collection.schema.js";
import mongoose from "mongoose";
import User from "./login.schema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const productdetails= async (req, res) => {
    try {
        const newProduct = req.body;
    const result = await itemcollection.create(newProduct);
    res.status(200).json({message:"product created",data:result});
        
    } catch (error) {
        
        console.log("product create error" ,error)
    }
    
}


export const getproductdetails=async(req,res)=>{
    try {
        const query = {};
            const cursor = itemcollection.find(query);
            const product = await cursor.exec();
            res.status(200).json({message:"get product",data:product});
        
    } catch (error) {
        console.log("get error" ,error)
        
    }
}

export const deleteproductdetails=async(req,res)=>{
try {
    const deleteId = req.params.id
   console.log(deleteId)
    const result = await itemcollection.deleteOne({ _id: new mongoose.Types.ObjectId(deleteId) })
    if (result.deletedCount === 0) {
        return res.status(404).json({ error: "product not found" })
    }
    res.status(200).json({ message: "deleted  successfully" })
} catch (error) {
    console.log(error)
    
}
  

}


 export const registeruser =async (req, res) => {
    try {
      const { username,Email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username,Email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



  export const loginform =async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      const token = jwt.sign({ userId: user._id }, 'your_secret_key');
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }}


  
