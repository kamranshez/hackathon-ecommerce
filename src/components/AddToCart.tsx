"use client";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { cartActions } from "@/store/slice/cartSlice";
import toast from "react-hot-toast";
const AddToCart: FC<{
  title: string;
  description: string;
  price: number;
  quantity: number;
  id: string | number;
  image: string;
}> = ({ title, description, price, quantity, id, image }) => {
  const dispatch = useDispatch();
  const addItem = () => {
    dispatch(
      cartActions.addToCart({
        product: {
          id: id,
          description: description,
          name: title,
          price: price,
          image: image,
        },
        quantity: quantity,
      })
    );
    toast.success("Product added");
  };
  return <Button onClick={addItem}>Add to Cart</Button>;
};

export default AddToCart;
