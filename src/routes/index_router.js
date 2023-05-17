import { Router } from "express";
import api_router from "./api/index.js";
import viewsRouter from "../routes/views/productsView.js";


const router = Router()

router.use('/api', api_router)
router.use ('/',viewsRouter)



export default router

