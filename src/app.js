import express from "express"
import morgan from "morgan"
import paymentRouter from "./routes/paymentRoute.js"
const app = express()

// middlewares
app.use(express.json())
app.use(morgan("dev"))

// routes
app.use("/api/v1/payment", paymentRouter)


app.get("/", (req, res) => {
    res.send("Payment Gateway")
})

export default app;