import styles from '../styles/ProductForm.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import {
  categorySchemaCheck,
  descriptionSchemaCheck,
  imageSchemaCheck,
  nameSchemaCheck,
  priceSchemaCheck,
  supplierSchemaCheck,
  weightSchemaCheck,
} from '../../../lib/schemas';
import { ProductDetailType } from '../../../types/ProductDetail';
import {
  useLazyGetProductQuery,
  useUpdateProductMutation,
} from '../api/productApiSlice';
import { useGetProductCategoriesQuery } from '../api/productCategoriesApiSlice';
import {
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';

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
      setValue('price', product.price.toString());
      setValue('weight', product.weight.toString());
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
    const product = {
      ...formData,
      price: parseInt(formData.price, 10),
      weight: parseFloat(formData.weight),
    };
    updateProduct({ id: productId!, product });
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/products/${productId}`);
  };

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>The product cannot be found. Redirecting...</p>;
  }

  return (
    <div>
      <div className="center-table-container">
        <div className="table-container">
          <div className="top-row">
            <Typography variant="h3">Edit product: {product?.name}</Typography>
          </div>

          <Paper elevation={3} sx={{ p: 3 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth margin="normal" variant="outlined">
                <TextField
                  label="Name"
                  variant="outlined"
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </FormControl>

              <FormControl fullWidth margin="normal" variant="outlined">
                <TextField
                  label="Description"
                  variant="outlined"
                  {...register('description')}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </FormControl>

              <FormControl fullWidth margin="normal" variant="outlined">
                <TextField
                  type="number"
                  label="Price"
                  variant="outlined"
                  {...register('price')}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              </FormControl>

              <FormControl fullWidth margin="normal" variant="outlined">
                <TextField
                  type="number"
                  label="Weight"
                  variant="outlined"
                  {...register('weight')}
                  error={!!errors.weight}
                  helperText={errors.weight?.message}
                />
              </FormControl>

              <FormControl fullWidth margin="normal" variant="outlined">
                <TextField
                  label="Supplier"
                  variant="outlined"
                  {...register('supplier')}
                  error={!!errors.supplier}
                  helperText={errors.supplier?.message}
                />
              </FormControl>

              <FormControl fullWidth margin="normal" variant="outlined">
                <TextField
                  label="Image URL"
                  variant="outlined"
                  {...register('imageUrl')}
                  error={!!errors.imageUrl}
                  helperText={errors.imageUrl?.message}
                />
              </FormControl>

              {!isProductCategoriesFetching && productCategories && (
                <FormControl fullWidth margin="normal" variant="outlined">
                  <Select
                    displayEmpty
                    {...register('category')}
                    defaultValue={product.category.id}
                    error={!!errors.category}
                  >
                    {productCategories.map((productCategory) => (
                      <MenuItem
                        value={productCategory.id}
                        key={productCategory.id}
                      >
                        {productCategory.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.category && (
                    <FormHelperText sx={{ color: '#f44336' }}>
                      {errors.category.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}

              <div className={styles.formButtons}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mr: 1 }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isUpdating}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
}
