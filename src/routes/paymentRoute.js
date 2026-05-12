import express from "express"
import { getKey, paymentVerification, processPayment } from "../contollers/paymentContoller.js"
const router = express.Router()

router.post("/process-payment", processPayment)

router.get("/getkey", getKey)

router.post("/paymentVerification", paymentVerification)

export default router