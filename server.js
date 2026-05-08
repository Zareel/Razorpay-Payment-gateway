import app from "./src/app.js";
import colors from "colors"
import config from "./src/config/config.js";
import Razorpay from "razorpay";

export const instance = new Razorpay({
  key_id: config.RAZORPAY_KEY_ID,
  key_secret: config.RAZORPAY_KEY_SECRET
});


const PORT = config.PORT;

app.listen(PORT,(req, res) =>{
    console.log(`App is successfully running at PORT: ${PORT} `.bgMagenta.white)
} )

