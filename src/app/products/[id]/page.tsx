import Quantity from "@/components/Quantity";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../../sanity/lib/image";
import AddToCart from "@/components/AddToCart";

interface IProduct {
  title: string;
  description: string;
  price: number;
  _id: string | number;
  image: IImage;
  catagory: { name: string };
}

const getProductsDetail = async (id: number | string) => {
  const res =
    await client.fetch(`*[_type=="product" && _id=="${id}" ]{price,_id,title,price,description,image,catagory->{name}}
`);
  return res;
};

const sizes = ["xs", "sm", "md", "lg", "xl"];

export default async function ProductDetailView({
  params,
}: {
  params: { id: string };
}) {
  const result: IProduct[] = await getProductsDetail(params.id);
  // console.log(result);

  return (
    <div className="flex flex-wrap py-10 mt-16">
      {result.map((product: any) => (
        <div key={product._id} className="flex justify-between gap-6">
          {/* Left Image */}
          <div className="mx-8">
            <Image
              src={urlForImage(product.image).url()}
              alt={product.title}
              width={120}
              height={120}
            />
          </div>
          <div>
            <Image
              src={urlForImage(product.image).url()}
              alt={product.title}
              width={500}
              height={800}
            />
          </div>
          {/* Right Content */}
          <div>
            <div>
              <h1 className="text-2xl mt-8">{product.description}</h1>
              <h2 className="text-base font-semibold text-gray-400">
                {product.title}
              </h2>
            </div>
            <div>
              <h3 className="mt-6 text-xs font-semibold">SELECT SIZE</h3>
              {/* Sizes */}
              <div className="flex gap-x-3">
                {sizes.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="w-10 h-10 mt-2 duration-300 border rounded-full font-bold center hover:shadow-xl"
                    >
                      <span className="text-[18px] font-semibold text-center text-gray-600">
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
              {/* Quantity */}
              <div className="flex items-center mt-6 gap-x-3">
                <h3 className="text-[18px] font-semibold">Quantity:</h3>
                <Quantity />
              </div>
              {/* Add to Cart */}
              <div className="flex items-center mt-5 gap-x-4">
                {/* <AddToCart /> */}
                <h2 className="text-3xl font-bold">
                  ${product.price.toFixed(2)}
                </h2>
                <AddToCart
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  quantity={1}
                  id={product._id}
                  image={urlForImage(product.image).url()}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
