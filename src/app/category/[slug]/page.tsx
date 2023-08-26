import ProductCard from "@/components/ProductCard";
import { Products } from "@/utils/mock";
import { Product } from "@/utils/types";
import { StaticImageData } from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../../sanity/lib/image";

interface Iproduct {
  title: string;
  description: string;
  price: number;
  _id: string | number;
  image: IImage;
  catagoryName: string;
}

const getPrdouctsByCategory = (category: string) => {
  const productData = Products.filter((item) => item.category === category);
  return productData;
};

const getProductDatabyCatagory = async (catagory: string) => {
  if (catagory == "all") {
    const res =
      await client.fetch(`*[_type=="product"]{price,_id,title,price,description,image,"catagoryName":catagory->name}
`);
    return res;
  } else {
    const res =
      await client.fetch(`*[_type=="product"]{price,_id,title,price,description,image,"catagoryName":catagory->name}[catagoryName==
    "${catagory}"]
`);

    return res;
  }
};

export default async function Catagory({
  params,
}: {
  params: { slug: string };
}) {
  const result: Iproduct[] = await getProductDatabyCatagory(params.slug);
  //console.log(result);

  return (
    <div className="mx-32 my-16 grid lg:grid-cols-4 sm:grid-cols-1 grid-rows-2 gap-16 justify-between justify-items-center">
      {result.length > 0 ? (
        result.map((item) => (
          <ProductCard
            key={item._id}
            description={item.description}
            title={item.title}
            price={item.price}
            catagory={item.catagoryName}
            img={urlForImage(item.image).url()}
            _id={item._id}
          />
        ))
      ) : (
        <p> No Product Found</p>
      )}
    </div>
  );
}
