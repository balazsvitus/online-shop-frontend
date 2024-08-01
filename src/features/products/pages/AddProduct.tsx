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
    <div className="center-table-container">
      <div className="table-container">
        <div className="top-row">
          <Typography variant="h3">Add product...</Typography>
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

            {!isFetching && productCategories && (
              <FormControl fullWidth margin="normal" variant="outlined">
                <Select
                  displayEmpty
                  defaultValue=""
                  {...register('category')}
                  error={!!errors.category}
                >
                  <MenuItem value="" disabled>
                    Select a category
                  </MenuItem>
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
                disabled={isAdding}
              >
                Submit
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
}
