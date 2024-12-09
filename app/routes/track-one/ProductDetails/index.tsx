import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { deleteProduct, updateProduct } from '~/apis';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import ModalDialog from '~/components/ui/modal-dialog'
import EditProductForm from '../EditProductForm';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

const ProductDetails = memo(({ product, onSuccess }: { product: Product; onSuccess: () => void }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { register, handleSubmit } = useForm<Product>({
    defaultValues: product
  });

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id.toString());
      onSuccess();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const onSubmit = async (data: Product) => {
    try {
      await updateProduct(product.id.toString(), data);
      setIsEditMode(false);
      onSuccess();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative h-[300px] group">
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200/20">
            Stock: {product.stock}
          </span>
        </div>

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
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm text-gray-700">
            {product.name}
          </h3>
          <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
        </div>

        <div className="mt-2 flex space-x-2">
          <button
            onClick={() => setIsEditMode(true)}
            className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-100 rounded hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>

      {isEditMode && (
        <EditProductForm
          product={product}
          onClose={() => setIsEditMode(false)}
          onSuccess={onSuccess}
        />
      )}

      {showDeleteModal && (
        <ModalDialog
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Product"
          description="Are you sure you want to delete this product? This action cannot be undone."
          icon={<ExclamationTriangleIcon className="size-6 text-red-600" />}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={handleDelete}
          confirmButtonClass="bg-red-600 hover:bg-red-500"
        />
      )}
    </div>
  );
});

ProductDetails.displayName = 'ProductDetails';

export default ProductDetails;