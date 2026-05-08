import express from "express"
import { getKey, processPayment } from "../contollers/paymentContoller.js"
const router = express.Router()

router.post("/process-payment", processPayment)

router.get("/getkey", getKey)

export default router