import dotenv from "dotenv"

dotenv.config()

const config = {
    PORT: process.env.PORT || 5000,
    RAZORPAY_API_KEY:process.env.RAZORPAY_API_KEY,
    RAZORPAY_API_SECRET:process.env.RAZORPAY_API_SECRET
}

export default config