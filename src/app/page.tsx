import { Heart } from "lucide-react";
import Image from "next/image";
import Hero from "@/views/Hero";
import ProductList from "@/views/ProductList";
import StripeCheckOutButton from "@/components/Checkout";
import Hero1 from "@/views/Hero1";
import FeatureProducts from "@/views/FeatureProducts";
import DesignerHero from "@/views/DesingerHero";
import NewsLetter from "@/views/NewsLetter";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div>
      {/* <Button variant="outline">Button</Button>
      <Button>Button</Button>
      <Button>
        <Heart className="mr-2 h-4 w-4" /> Login with Email
      </Button> */}

      <Hero />
      <Hero1 />
      <FeatureProducts />
      <DesignerHero />
      <NewsLetter />
      <ProductList />
    </div>
  );
}
