"use client";

import { BsTrash } from "react-icons/bs";
// import { Button } from "@/components/ui/button";
import { AiOutlineShopping } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../../sanity/lib/client";

import { useDispatch, useSelector } from "react-redux";
import {
  CartProducts,
  TotalCartAmount,
  TotalCartQuantity,
} from "@/store/store";
import CartItemQtyCard from "@/components/ItemQtyCard";
import { cartActions } from "@/store/slice/cartSlice";
import { toast } from "react-hot-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// import { useRouter } from "next/navigation";
import StripeCheckoutButton from "@/components/Checkout";

export default function ShoppingCart() {
  const dispath = useDispatch();
  const products = useSelector(CartProducts);
  const cartQty = useSelector(TotalCartQuantity);
  const cartAmount = useSelector(TotalCartAmount);
  const handleDeleteItemFromCart = (id: string) => {
    dispath(cartActions.deleteItemFromCart({ id }));
    toast.success(`Cart Item successfully deleted.`);
  };

  const handleClearCart = () => {
    dispath(cartActions.clearCart());
    toast.success("Cart successfully cleared.");
  };
  return (
    <div className="mx-32 py-8 my-16 flex flex-col justify-between justify-items-center">
      <div className="flex justify-between">
        <h2 className="scroll-m-20 pb-2 text-2xl font-bold tracking-tight transition-colors first:mt-0">
          Shopping Cart
        </h2>
        {products.length >= 1 && (
          <AlertDialog>
            <AlertDialogTrigger className="w-fit text-sm text-red-400">
              Clear Cart
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure, you want to delete all items from cart?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleClearCart()}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <div className="mt-8 gap-4 flex-1">
        <div className="flex flex-col justify-center items-center">
          {products.length < 1 && (
            <div className="flex flex-col justify-center items-center gap-4">
              <AiOutlineShopping size={150} />
              <h1 className="text-3xl font-bold tracking-tight transition-colors">
                Your shopping bag is empty
              </h1>
            </div>
          )}

          {products.length >= 1 && (
            <div className="flex w-full">
              <div className="w-3/4 bg-white px-10">
                {products.map((item) => (
                  <div key={item._id} className="flex items-center py-5">
                    <div className="flex w-2/4">
                      <div className="w-[160px]">
                        {
                          <Image
                            className="max-w-none rounded-lg"
                            alt="Product Image"
                            src={item.image}
                            width={160}
                            height={176}
                          />
                        }
                      </div>
                      <div className="flex flex-col justify-between ml-4">
                        <span className=" font-light">{item.description}</span>
                        <span className="text-red-500 text-xs">
                          {/* {item.type} */}
                        </span>

                        <AlertDialog>
                          <AlertDialogTrigger className="w-fit">
                            <BsTrash />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure, you want to delete this item?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleDeleteItemFromCart(item.id)
                                }
                              >
                                Confirm
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <div className="flex justify-center w-1/5">
                      <CartItemQtyCard id={item.id} qty={item.quantity} />
                    </div>
                    <span className="text-center w-1/5 font-light text-lg">
                      ${item.price}
                    </span>
                    <span className="text-center w-1/5 font-light text-lg">
                      ${item.totalPrice}
                    </span>
                  </div>
                ))}

                <Link
                  href={"/category/all"}
                  className="flex font-semibold text-indigo-600 text-sm mt-10"
                >
                  <svg
                    className="fill-current mr-2 text-indigo-600 w-4"
                    viewBox="0 0 448 512"
                  >
                    <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>

              <div className="w-1/4 px-8 py-5 bg-slate-50">
                <h1 className="font-semibold text-2xl border-b pb-8">
                  Order Summary
                </h1>
                <div className="flex justify-between mt-5 mb-5">
                  <span className="font-semibold text-sm uppercase">
                    Quantity
                  </span>
                  <span className="font-semibold text-sm">
                    {cartQty} {cartQty > 1 ? "Products" : "Product"}
                  </span>
                </div>

                <div className="flex justify-between mt-5 mb-5">
                  <span className="font-semibold text-sm uppercase">
                    Sub Total
                  </span>
                  <span className="font-semibold text-sm">
                    $
                    {cartAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <div className="flex justify-between mt-5 mb-5">
                  <span className="font-semibold text-sm uppercase">
                    Discount
                  </span>
                  <span className="font-semibold text-sm">$0.00</span>
                </div>

                <div className="flex justify-between mt-5 mb-5">
                  <span className="font-semibold text-sm uppercase">VAT</span>
                  <span className="font-semibold text-sm">$0.00</span>
                </div>

                <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    <span>
                      $
                      {cartAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <StripeCheckoutButton products={products} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
