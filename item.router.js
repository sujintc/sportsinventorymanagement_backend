import express from 'express'
import { deleteproductdetails, getproductdetails, loginform, productdetails, registeruser } from './item.controller.js';

const router=express.Router()

router.post('/product',productdetails)
router.get('/get/product',getproductdetails)
router.delete('/delete/product/:id',deleteproductdetails)
router.post("/register",registeruser)
router.post("/login",loginform)



export default router;
