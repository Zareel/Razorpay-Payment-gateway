import { instance } from "../../server.js";
import config from "../config/config.js";
import crypto from "crypto";

export const processPayment = async (req, res) => {
  try {
    // get the amount from the frontend
    const { amount } = req.body;
    // create razorpay order options
    // this object is sent directly to razorpay
    const options = {
      amount: amount * 100, //convert ₹ to paise Because Razorpay accepts money ONLY in the smallest currency unit.
      currency: "INR", // tell the razorpay the currency type
      receipt: `receipt_${Date.now()}`, // creates a unique reciept id
    };
    // create razorpay order
    /*
    it sends requests to razorpay
    creates an order
    razorpay response with orderId, amount, currency and status

    */
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      message: "Payment process initiated successfully",
      order, // sends the orders to the frontend and frontend uses the orderId to open the Razorpay checkout
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Payment initiation failed",
      error,
    });
  }
};

export const getKey = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      key: config.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to get Raizorpay key",
      error,
    });
  }
};

export const paymentVerification = async (req, res) => {
  //  console.log(req.body)
  try {
    // destructure payment details from req.body
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    // create a verification string
    // this exact format must be matching Razorpay's documentation
    // even one char mismatch will lead to verifiaction fail
    // order_123|pay_567
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    // generate expected signature using razorpay secret key
    const expectedSignature = crypto
      .createHmac("sha256", config.RAZORPAY_KEY_SECRET) // generate expected signature using razorpay secret key
      .update(body.toString()) // update the above body variable and convert into string
      .digest("hex"); // whatever value we get, convert it into hexadecimal

      // console.log("Razorpay signature: ", razorpay_signature)
      // console.log("Expected signature: ", expectedSignature)

      if(expectedSignature === razorpay_signature){
        return res.redirect(`http://localhost:5173/payment/paymentSuccess?referece=${razorpay_payment_id}`)
      }else{
        // payment verification failed
        return res.status(400).json({
          success:false,
          message:"Invalid payment signature"
        })
      }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Payment varification failed",
      error,
    });
  }
};
