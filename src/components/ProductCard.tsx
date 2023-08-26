import React, { FC } from "react";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";

const ProductCard: FC<{
  title: string;
  description: string;
  price: number;
  catagory: string;
  img: string;
  _id: string | number;
}> = ({ title, description, price, catagory, img, _id }) => {
  return (
    <div>
      <Link href={`/products/${_id}`}>
        <Image
          className="max-h-[200px] object-cover object-top"
          width={250}
          height={350}
          src={img}
          alt={title}
        />
        <h3 className="font-bold text-lg mt-3">{description}</h3>
        <h4 className="text-gray-400 text-lg ">{title}</h4>
        <p className="font-bold text-lg mt-3">${price}</p>
      </Link>
      <AddToCart
        title={title}
        description={description}
        price={price}
        quantity={1}
        id={_id}
        image={img}
      />
    </div>
  );
};

export default ProductCard;
