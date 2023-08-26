import ProductCard from "@/components/ProductCard";
import React from "react";
import { StaticImageData } from "next/image";
import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../sanity/lib/image";

interface Iproduct {
  title: string;
  description: string;
  price: number;
  _id: string | number;
  image: IImage;
  catagory: { name: string };
}
const getProductData = async () => {
  const res =
    await client.fetch(`*[_type=="product"]{price,_id,title,description,image,catagory->{name}
}[0..2]`);
  return res;
};

const ProductList = async () => {
  const data: Iproduct[] = await getProductData();
  //console.log(data);

  //  console.log(productChunks);
  return (
    <div className="flex justify-evenly mt-16">
      {data.map((item) => (
        <ProductCard
          key={item._id}
          title={item.title}
          description={item.description}
          price={item.price}
          catagory={item.catagory.name}
          img={urlForImage(item.image).url()}
          _id={item._id}
        />
      ))}
      {/*33 />
      <ProductCard title="Cameryn Sash Tie Dress" price="$546" img={P1} />
      <ProductCard title="Flex Sweatshirt" price="$175" img={P1} /> */}
    </div>
  );
};

export default ProductList;
