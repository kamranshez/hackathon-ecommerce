import React from "react";
import { Products } from "@/utils/mock";
import ProductCard from "@/components/ProductCard";
import P1 from "public/p1.webp";
import { StaticImageData } from "next/image";

const AllProducts = () => {
  return (
    <div className="flex justify-evenly mt-16 flex-wrap">
      {/* {Products.map((item) => (
        <ProductCard
          key={item.id}
          title={item.name}
          price={item.price}
          category={item.category}
          img={item.image as StaticImageData}
          id={item.id}
        />
      ))} */}
    </div>
  );
};

export default AllProducts;
