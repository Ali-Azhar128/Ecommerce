import Navbar from "./Routes/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import
{
  BrowserRouter as Router, Routes, Route
} from "react-router-dom"


const stripePromise = loadStripe('pk_test_51PAn0mAu0v3xaJnqptEaH6yLhAARCvhg32b6XPxDcQDQIu6I7acEBoC0Q2NNJ25vfW0wkSYHq6p7wufF2sig9huV00db5l8OZ5')
function App() {
  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
        <Navbar/>
        <Outlet/>
        <ToastContainer/>
    </Elements>

  );
}

export default App;

