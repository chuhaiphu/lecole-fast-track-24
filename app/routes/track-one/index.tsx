import HeaderComponent from "~/components/ui/header";
import type { Route } from "../track-one/+types";
import FooterComponent from "~/components/ui/footer";
import { getAllProducts } from "~/apis";
import { useEffect, useState, useMemo } from "react";
import ProductDetails from "~/routes/track-one/ProductDetails";

export function meta({ }: Route.MetaArgs) {
  return [{ title: "Track One" }];
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

export default function TrackOne() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  // useMemo caches the sorted products array to prevent unnecessary re-sorting on every render
  // This optimization only recalculates when the products array changes
  // Particularly useful when dealing with expensive sorting operations or large datasets
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  return (
    <div>
      <HeaderComponent />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {sortedProducts.map((product) => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}
