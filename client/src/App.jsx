import React from "react";
import { data } from "./data/data";
import axios from "axios";


function App() {

  const checkOut = async(amount) => {
    try{
      const {data:orderData} = await axios.post("/api/v1/payment/process-payment",{amount})
      const {order} = orderData;
      // console.log("order: ", order)

      const {data:keyData} = await axios.get("/api/v1/payment/getKey")
      const {key} = keyData;
       console.log("key: ", key)

       // Open Razorpay Checkout
      const options = {
        key, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits.
        currency: 'INR',
        name: 'Zareel',
        description: 'Test Transaction',
        order_id:order.id, // This is the order_id created in the backend, get order id from order
        callback_url: '/api/v1/payment/paymentVerification', // Your success URL/ callback url, we have to create from backend
        prefill: {   // give user details
          name: 'Zareel',
          email: 'zareel.kalam@example.com',
          contact: '1234567890'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new window.Razorpay(options);  // creating razorpay instance
      rzp.open();

    }catch(error){
      console.log(error)
    }
  }
  
  return (
    <div className="min-h-screen bg-stone-900 text-gray-400">
      <div className="w-115 flex gap-10">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col bg-black items-center gap-2 py-10"
          >
            <img src={item.photo} alt={item.name} width="250" />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => {checkOut(item.price)}} className="bg-cyan-500 hover:bg-cyan-400 cursor-pointer text-black px-4 py-2 ">
              Pay Rs.{item.price}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
