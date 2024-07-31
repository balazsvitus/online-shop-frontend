import { useNavigate } from 'react-router-dom';
import styles from '../styles/ProductForm.module.css';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddProductMutation } from '../api/productApiSlice';
import { useEffect } from 'react';
import { useGetProductCategoriesQuery } from '../api/productCategoriesApiSlice';
import {
  categorySchemaCheck,
  descriptionSchemaCheck,
  imageSchemaCheck,
  nameSchemaCheck,
  priceSchemaCheck,
  supplierSchemaCheck,
  weightSchemaCheck,
} from '../../../lib/schemas';

const productSchema = z.object({
  name: nameSchemaCheck,
  description: descriptionSchemaCheck,
  price: priceSchemaCheck,
  weight: weightSchemaCheck,
  supplier: supplierSchemaCheck,
  imageUrl: imageSchemaCheck,
  category: categorySchemaCheck,
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function AddProduct() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const [
    addProduct,
    { isLoading: isAdding, isSuccess: isAddingSuccess, error: addingError },
  ] = useAddProductMutation();
  const { isFetching, data: productCategories } =
    useGetProductCategoriesQuery();

  useEffect(() => {
    if (isAddingSuccess) {
      navigate('/products');
    }
  }, [isAddingSuccess, navigate]);

  useEffect(() => {
    if (addingError) {
      alert((addingError as { error: string }).error);
    }
  }, [addingError]);

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    const productFromForm = {
      ...data,
      price: parseInt(data.price, 10),
      weight: parseFloat(data.price),
    };

    addProduct(productFromForm);
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/products');
  };

  return (
    <div className={`${styles.centerTableContainer}`}>
      <div className={`${styles.tableContainer}`}>
        <div className={`${styles.topRow}`}>
          <h1>Add product...</h1>
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
              <p className={`${styles.errorMessage}`}>{errors.name.message}</p>
            )}
          </div>

          <div className={`${styles.gridItem} ${styles.item1}`}>
            <label htmlFor="description">Description</label>
          </div>
          <div className={`${styles.gridItem} ${styles.item2}`}>
            <textarea id="description" {...register('description')}></textarea>
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
              <p className={`${styles.errorMessage}`}>{errors.price.message}</p>
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
            <input type="text" id="supplier" {...register('supplier')}></input>
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
            <input type="text" id="imageUrl" {...register('imageUrl')}></input>
            {errors.imageUrl && (
              <p className={`${styles.errorMessage}`}>
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          {!isFetching && productCategories && (
            <>
              <div className={`${styles.gridItem} ${styles.item1}`}>
                <label htmlFor="category">Category</label>
              </div>
              <div className={`${styles.gridItem} ${styles.item2}`}>
                <select id="category" defaultValue="" {...register('category')}>
                  <option value="" disabled>
                    Select a category
                  </option>
                  {productCategories.map((productCategory) => (
                    <option value={productCategory.id} key={productCategory.id}>
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
            <button type="submit" disabled={isAdding}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
