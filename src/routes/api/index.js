import { Router } from "express";
import productsRouter from "./products.js"
import cartsRouter from "./carts.js";
import viewsRouter from "../views/productsView.js";



const api_router = Router()
api_router.use('/products', productsRouter)
api_router.use('/carts', cartsRouter)
api_router.use('/views',viewsRouter)

export default api_router





//api para enviear datos