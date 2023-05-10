import { Router } from "express";
import productsRouter from "./products.js"
import cartsRouter from "./carts.js";


const api_router = Router()
api_router.use('/products', productsRouter)
api_router.use('/carts', cartsRouter)

export default api_router





//api para enviear datos