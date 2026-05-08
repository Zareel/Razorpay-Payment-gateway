import React from "react";
import { data } from "./data/data";
import axios from "axios";

function App() {
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
            <button className="bg-cyan-500 hover:bg-cyan-400 cursor-pointer text-black px-4 py-2 ">
              Pay Rs.{item.price}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
