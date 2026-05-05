import express from "express"
import { processPayment } from "../contollers/paymentContoller.js"
const router = express.Router()

router.post("/process-payment", processPayment)

export default router