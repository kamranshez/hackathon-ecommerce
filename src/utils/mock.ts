import { Product } from "./types";
import P1 from "/public/p1.webp";
import P2 from "/public/p2.png";
import P3 from "/public/p3.png";

export const Products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    tagline: "Dress",
    category: "female",
    price: 20,
    image: P1,
  },
  {
    id: 2,
    name: "Product 2",
    category: "female",
    tagline: "Dress",
    price: 200,
    image: P2,
  },
  {
    id: 3,
    name: "Product 3",
    category: "female",
    tagline: "Dress",
    price: 203,
    image: P3,
  },
  {
    id: 4,
    name: "Product 4",
    category: "male",
    tagline: "Dress",
    price: 20,
    image: P1,
  },
  {
    id: 5,
    name: "Product 5",
    category: "male",
    tagline: "Dress",
    price: 205,
    image: P1,
  },
  {
    id: 6,
    name: "Product 6",
    category: "kids",
    tagline: "Dress",
    price: 20,
    image: P1,
  },
  {
    id: 7,
    name: "Product 7",
    category: "kids",
    tagline: "Dress",
    price: 207,
    image: P1,
  },
];
