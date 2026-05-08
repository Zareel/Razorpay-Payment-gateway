import { instance } from "../../server.js";
import config from "../config/config.js";


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
      key: config.RAZORPAY_API_KEY,
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
