import styles from '../styles/ProductForm.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import useProductDetails from '../hooks/useProductDetails';
import { useEffect } from 'react';
import useProductCategories from '../hooks/useProductCategories';
import useProducts from '../hooks/useProducts';

const productSchema = z.object({
  name: z.string().min(3, 'Name should have at least 3 characters'),
  description: z
    .string()
    .min(10, 'Description should have at least 10 characters'),
  price: z
    .string()
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val) && val > 0, 'Price must be bigger than 0'),
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
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });
  const { productId } = useParams();
  const location = useLocation();
  const { product } = location.state || {};
  const navigate = useNavigate();
  const {
    productDetails,
    productDetailsLoading,
    fetchProductDetails,
    setProductFromState,
  } = useProductDetails(productId!);
  const { productCategories, productCategoriesLoading } =
    useProductCategories();
  const { updateProduct, updatingProduct } = useProducts();

  useEffect(() => {
    const navigateToProducts = () => {
      navigate('/products', { replace: true });
    };

    if (product) {
      setProductFromState(product);
    } else {
      fetchProductDetails(navigateToProducts);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() => {
    setValue('name', productDetails?.name || '');
    setValue('description', productDetails?.description || '');
    setValue('price', productDetails?.price || 1);
    setValue('weight', productDetails?.weight || 0);
    setValue('supplier', productDetails?.supplier || '');
    setValue('imageUrl', productDetails?.imageUrl || '');
    setValue('category', productDetails?.category.id || '');
  }, [productDetails, setValue]);

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    updateProduct(productId!, data, () => {
      navigate(`/products/${productId}`);
    });
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/products/${productId}`);
  };

  return (
    <div>
      {productDetailsLoading ? (
        <p>Loading</p>
      ) : (
        <div className={`${styles.centerTableContainer}`}>
          <div className={`${styles.tableContainer}`}>
            <div className={`${styles.topRow}`}>
              <h1>Edit product: {productDetails?.name}</h1>
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

              {!productCategoriesLoading && (
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
                <button className={styles.cancelButton} onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" disabled={updatingProduct}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
