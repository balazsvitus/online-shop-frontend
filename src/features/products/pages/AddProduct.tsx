import { useNavigate } from 'react-router-dom';
import styles from '../styles/ProductForm.module.css';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useProductCategories from '../hooks/useProductCategories';
import useProducts from '../hooks/useProducts';
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
  const { productCategories, productCategoriesLoading } =
    useProductCategories();
  const { addProduct, addingProduct } = useProducts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const navigateToProducts = () => {
    navigate('/products');
  };

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    addProduct(data, navigateToProducts);
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigateToProducts();
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

          {!productCategoriesLoading && (
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
            <button type="submit" disabled={addingProduct}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
