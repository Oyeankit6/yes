// "use client";
// import { useContext, useState } from "react";

// import "./recharge.css"; // Importing CSS for styling
// import { StoreContext } from "@/app/Context/AccountContext";

// export default function RechargePage() {
//   const { loggedinUser } = useContext(StoreContext);

//   const [selectedAmount, setSelectedAmount] = useState();
//   const [selectedPayment, setSelectedPayment] = useState("");

//   const amounts = [100, 300, 500, 1000, 2000, 5000, 10000, 50000];
//   const paymentMethods = [
//     { id: "superpay", name: "superpay", range: "300-50000" },
//     { id: "icepay", name: "icepay", range: "200-50000" },
//     { id: "payplus-new", name: "payplus-new", range: "300-50000" },
//     { id: "ok2pay", name: "Ok2pay", range: "300-50000" },
//     { id: "ffpay_upi_101", name: "FFPAY_UPI_101", range: "100-50000" },
//   ];

//   const handleAmountSelect = (amount) => {
//     setSelectedAmount(amount);
//   };

//   const handlePaymentSelect = (paymentId) => {
//     setSelectedPayment(paymentId);
//   };

//   const handleRecharge = async () => {
//     if (!selectedAmount || !selectedPayment) {
//       alert("Please select both amount and payment method.");
//     } else {
//       alert(`Recharging with ${selectedAmount} using ${selectedPayment}`);
//       const oldBal = Number(loggedinUser.balance);
//       console.log(oldBal);
//       const updateBalance = oldBal + Number(selectedAmount);
//       console.log(updateBalance);

//       if (loggedinUser) {
//         await fetch("/api/updatebalance", {
//           method: "POST",
//           body: JSON.stringify({
//             mobileNumber: loggedinUser.mobileNumber,
//             balance: updateBalance,
//           }),
//         });
//       }
//     }
//   };

//   return (
//     <div className="recharge-container">
//       <div>
//         <h1 className="head">Recharge</h1>
//       </div>
//       <h2 className="head2">Balance: ₹{loggedinUser.balance}</h2>
//       <div className="recharge-amount">
//         <input
//           type="Number"
//           placeholder="Enter or Select recharge amount"
//           value={selectedAmount}
//           onChange={(e) => setSelectedAmount(e.target.value)}
//         />
//       </div>
//       <div className="amount-buttons">
//         {amounts.map((amount) => (
//           <button
//             key={amount}
//             className={`amount-btn ${
//               selectedAmount == amount ? "selected" : ""
//             }`}
//             onClick={() => handleAmountSelect(amount)}
//           >
//             {amount}
//           </button>
//         ))}
//       </div>
//       <div className="tips">
//         <p>
//           Tips: Please contact{" "}
//           <a href="mailto:letscash@gmail.com">letscash@gmail.com</a> if you have
//           any questions about the order or payment failure.
//         </p>
//       </div>
//       <div className="payment-methods">
//         {paymentMethods.map((method) => (
//           <div key={method.id} className="payment-option">
//             <input
//               type="radio"
//               id={method.id}
//               name="paymentMethod"
//               value={method.id}
//               checked={selectedPayment === method.id}
//               onChange={() => handlePaymentSelect(method.id)}
//             />
//             <label htmlFor={method.id}>
//               {method.name} ({method.range})
//             </label>
//           </div>
//         ))}
//       </div>
//       <button className="recharge-btn" onClick={handleRecharge}>
//         Recharge
//       </button>
//     </div>
//   );
// }

"use client";
import { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StoreContext } from "@/app/Context/AccountContext";
import "./recharge.css";

// Load Stripe instance
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function CheckoutForm({ loggedinUser, selectedAmount, setSelectedAmount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet. Please try again.");
      return;
    }

    if (!selectedAmount) {
      alert("Please select an amount.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Create a Payment Intent with card as the payment method
      const response = await fetch("/api/recharge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedAmount,
          payment_method_type: "card",
        }),
      });

      const { clientSecret } = await response.json();

      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const updatedBalance = Number(loggedinUser.balance) + selectedAmount;

        await fetch("/api/updatebalance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mobileNumber: loggedinUser.mobileNumber,
            balance: updatedBalance,
          }),
        });

        setSuccessMessage(
          `Recharge successful! New balance: ₹${updatedBalance}`
        );
      }
    } catch (error) {
      console.error("Recharge error:", error);
      setErrorMessage("An error occurred while processing the payment.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="head">Recharge</h1>
      <h2 className="head2">Balance: ₹{loggedinUser.balance}</h2>

      <div className="amount-buttons">
        {Array.from({ length: 8 }, (_, i) => (i + 1) * 100).map((amount) => (
          <button
            key={amount}
            className={`amount-btn ${
              selectedAmount === amount ? "selected" : ""
            }`}
            onClick={() => setSelectedAmount(amount)}
          >
            {amount}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <CardElement className="card-input" />
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <button
          className="recharge-btn"
          type="submit"
          disabled={isProcessing || !selectedAmount}
        >
          {isProcessing ? "Processing..." : "Recharge with Card"}
        </button>
      </form>

      <div className="tips">
        <p>
          Tips: Please contact{" "}
          <a href="mailto:letscash@gmail.com">letscash@gmail.com</a> if you have
          any questions about the order or payment failure.
        </p>
      </div>
    </div>
  );
}

export default function RechargePage() {
  const { loggedinUser } = useContext(StoreContext);
  const [selectedAmount, setSelectedAmount] = useState();

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        loggedinUser={loggedinUser}
        selectedAmount={selectedAmount}
        setSelectedAmount={setSelectedAmount}
      />
    </Elements>
  );
}
