import { memo } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

// memo prevents unnecessary re-renders of ProductDetails component
// Only re-renders when the product prop changes
// Improves performance when parent components re-render frequently
const ProductDetails = memo(({ product }: { product: Product }) => (
  <div className="group relative">
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative">
      <img
        src={product.image_url}
        alt={product.name}
        className="h-full w-full object-cover object-center transition-all duration-300 group-hover:blur-[2px]"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 transition-all duration-300 group-hover:opacity-100" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 translate-y-full group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-sm text-white px-4 text-center">
          {product.description}
        </p>
      </div>
    </div>
    <div className="mt-4 flex justify-between">
      <div>
        <h3 className="text-sm text-gray-700">
          <a href="#">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </a>
        </h3>
      </div>
      <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
    </div>
  </div>
));

ProductDetails.displayName = 'ProductDetails';

export default ProductDetails;
