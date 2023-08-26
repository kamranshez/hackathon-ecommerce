"use client";
import getStipePromise from "@/lib/stripe";

interface Product {
  product: number | string;
  name: string;
  price: number;
}

type ProductArray = Product[];

const StripeCheckOutButton: React.FC<{ products: ProductArray }> = ({
  products,
}) => {
  const handleCheckout = async () => {
    const stripe = await getStipePromise();
    const response = await fetch("/api/stripe-session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify(products),
    });

    const data = await response.json();
    if (data.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id });
    }
  };

  return (
    <div className="py-5">
      <button
        className="bg-green-500 py-3 px-3 rounded-md"
        onClick={handleCheckout}
      >
        Check out
      </button>
    </div>
  );
};

export default StripeCheckOutButton;
