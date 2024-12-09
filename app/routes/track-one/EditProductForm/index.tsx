import { useForm } from 'react-hook-form';
import { updateProduct } from '~/apis';
import { useState } from 'react';
import ModalDialog from '~/components/ui/modal-dialog';
import { createPortal } from 'react-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

export default function EditProductForm({ product, onClose, onSuccess }: { product: Product, onClose: () => void, onSuccess: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Product>({
    defaultValues: product
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const onSubmit = async (data: Product) => {
    try {
      await updateProduct(product.id.toString(), data);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  return createPortal(
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-[100]">
      <div className="fixed inset-0 z-[110] overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-6">Edit Product</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                      Product Name
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                      Description
                    </label>
                    <textarea
                      {...register('description', { required: 'Description is required' })}
                      rows={3}
                      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register('price', { required: 'Price is required', min: 0 })}
                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                        Stock
                      </label>
                      <input
                        type="number"
                        {...register('stock', { required: 'Stock is required', min: 0 })}
                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="image_url" className="block text-sm font-medium leading-6 text-gray-900">
                      Image URL
                    </label>
                    <input
                      {...register('image_url', { required: 'Image URL is required' })}
                      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.image_url && <p className="mt-1 text-sm text-red-600">{errors.image_url.message}</p>}
                  </div>

                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      onClick={handleSubmit((data) => {
                        setShowConfirmModal(true);
                      }, (errors) => {
                        console.log('Validation errors:', errors);
                      })}
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showConfirmModal && (
        <ModalDialog
          open={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          title="Update Product"
          description="Are you sure you want to save these changes?"
          confirmLabel="Save"
          cancelLabel="Cancel"
          onConfirm={() => handleSubmit(onSubmit)()}
          confirmButtonClass="bg-indigo-600 hover:bg-indigo-500"
        />
      )}
    </div>,
    document.body
  );
}
