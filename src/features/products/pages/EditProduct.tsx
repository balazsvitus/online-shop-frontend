import styles from '../styles/ProductForm.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import {
  useLazyGetProductQuery,
  useUpdateProductMutation,
} from '../api/productApiSlice';
import { ProductDetailType } from '../../../types/ProductDetail';
import { useGetProductCategoriesQuery } from '../api/productCategoriesApiSlice';

const productSchema = z.object({
  name: z.string().min(3, 'Name should have at least 3 characters'),
  description: z
    .string()
    .min(10, 'Description should have at least 10 characters'),
  price: z.number(),
  weight: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val >= 0, 'Weight must be positive'),
  supplier: z.string().min(1, 'Supplier should have at least 1 character'),
  imageUrl: z.string().min(3, 'Image URL should have at least 3 characters'),
  category: z.string().min(1, 'Category should not be empty'),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { product: productFromState } = location.state || {};

  const [product, setProduct] = useState<ProductDetailType | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const [fetchProductDetails, { isFetching, error: fetchError, data }] =
    useLazyGetProductQuery();
  const [
    updateProduct,
    { isLoading: isUpdating, isSuccess: isUpdateSuccess, error: updateError },
  ] = useUpdateProductMutation();
  const { isFetching: isProductCategoriesFetching, data: productCategories } =
    useGetProductCategoriesQuery();

  useEffect(() => {
    if (productFromState) {
      setProduct(productFromState);
    } else if (productId) {
      fetchProductDetails(productId);
    }
  }, [fetchProductDetails, productFromState, productId]);

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('description', product.description);
      setValue('price', product.price);
      setValue('weight', product.weight);
      setValue('supplier', product.supplier);
      setValue('imageUrl', product.imageUrl);
      setValue('category', product.category.id);
    }
  }, [product, setValue]);

  useEffect(() => {
    if (isUpdateSuccess) {
      navigate(`/products/${productId}`);
    }
  }, [isUpdateSuccess, navigate, productId]);

  useEffect(() => {
    if (fetchError) {
      alert((fetchError as { error: string }).error);
    }
  }, [fetchError]);

  useEffect(() => {
    if (updateError) {
      alert((updateError as { error: string }).error);
    }
  }, [updateError]);

  const onSubmit: SubmitHandler<ProductFormValues> = (formData) => {
    updateProduct({ id: productId!, product: formData });
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/products/${productId}`);
  };

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className={`${styles.centerTableContainer}`}>
        <div className={`${styles.tableContainer}`}>
          <div className={`${styles.topRow}`}>
            <h1>Edit product: {product?.name}</h1>
          </div>

          <form
            className={styles.gridContainer}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={`${styles.gridItem} ${styles.item1}`}>
              <label htmlFor="name">Name</label>
            </div>
            <div className={`${styles.gridItem} ${styles.item2}`}>
              <input type="text" id="name" {...register('name')}></input>
              {errors.name && (
                <p className={`${styles.errorMessage}`}>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className={`${styles.gridItem} ${styles.item1}`}>
              <label htmlFor="description">Description</label>
            </div>
            <div className={`${styles.gridItem} ${styles.item2}`}>
              <textarea
                id="description"
                {...register('description')}
              ></textarea>
              {errors.description && (
                <p className={`${styles.errorMessage}`}>
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className={`${styles.gridItem} ${styles.item1}`}>
              <label htmlFor="price">Price</label>
            </div>
            <div className={`${styles.gridItem} ${styles.item2}`}>
              <input
                type="number"
                id="price"
                step="1"
                {...register('price')}
              ></input>
              {errors.price && (
                <p className={`${styles.errorMessage}`}>
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className={`${styles.gridItem} ${styles.item1}`}>
              <label htmlFor="weight">Weight</label>
            </div>
            <div className={`${styles.gridItem} ${styles.item2}`}>
              <input
                type="number"
                id="weight"
                step="1"
                {...register('weight')}
              ></input>
              {errors.weight && (
                <p className={`${styles.errorMessage}`}>
                  {errors.weight.message}
                </p>
              )}
            </div>

            <div className={`${styles.gridItem} ${styles.item1}`}>
              <label htmlFor="supplier">Supplier</label>
            </div>
            <div className={`${styles.gridItem} ${styles.item2}`}>
              <input
                type="text"
                id="supplier"
                {...register('supplier')}
              ></input>
              {errors.supplier && (
                <p className={`${styles.errorMessage}`}>
                  {errors.supplier.message}
                </p>
              )}
            </div>

            <div className={`${styles.gridItem} ${styles.item1}`}>
              <label htmlFor="imageUrl">Image URL</label>
            </div>
            <div className={`${styles.gridItem} ${styles.item2}`}>
              <input
                type="text"
                id="imageUrl"
                {...register('imageUrl')}
              ></input>
              {errors.imageUrl && (
                <p className={`${styles.errorMessage}`}>
                  {errors.imageUrl.message}
                </p>
              )}
            </div>

            {!isProductCategoriesFetching && productCategories && (
              <>
                <div className={`${styles.gridItem} ${styles.item1}`}>
                  <label htmlFor="category">Category</label>
                </div>
                <div className={`${styles.gridItem} ${styles.item2}`}>
                  <select
                    id="category"
                    defaultValue=""
                    {...register('category')}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {productCategories.map((productCategory) => (
                      <option
                        value={productCategory.id}
                        key={productCategory.id}
                      >
                        {productCategory.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className={`${styles.errorMessage}`}>
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </>
            )}

            <div className={styles.formButtons}>
              <button
                className={`${styles.cancelButton} top-row-button`}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" disabled={isUpdating}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
