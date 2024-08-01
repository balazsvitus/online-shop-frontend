import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useShoppingCartContext from '../../../hooks/useShoppingCartContext';
import useAuthContext from '../../../hooks/useAuthContext';
import {
  useDeleteProductMutation,
  useLazyGetProductQuery,
} from '../api/productApiSlice';
import { ProductDetailType } from '../../../types/ProductDetail';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import {
  AbcRounded,
  AddShoppingCartRounded,
  CategoryRounded,
  FactoryRounded,
  FitnessCenterRounded,
  NotesRounded,
  PaymentsRounded,
} from '@mui/icons-material';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const { addToShoppingCart } = useShoppingCartContext();

  const location = useLocation();
  const { product: productFromState } = location.state || {};
  const { isAdmin } = useAuthContext();

  const [deleteProduct, { isLoading: isDeleting, isSuccess: isDeleteSuccess }] =
    useDeleteProductMutation();
  const [fetchProductDetails, { isError, isFetching, error, data }] =
    useLazyGetProductQuery();

  useEffect(() => {
    if (productFromState) {
      setProduct(productFromState);
    } else if (productId) {
      fetchProductDetails(productId);
    }
  }, [productFromState, productId, fetchProductDetails]);

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  useEffect(() => {
    if (isDeleteSuccess) {
      navigate('/products');
    }
  }, [isDeleteSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      alert(
        (error as { message: string }).message ||
          'Error fetching product details',
      );
      navigate('/products');
    }
  }, [isError, error, navigate]);

  const handleOpen = () => {
    if (!isFetching && !isDeleting && product) {
      setDialogOpen(true);
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleDialogAgree = () => {
    handleClose();
    deleteProduct(product!.id);
  };

  const handleBack = () => navigate('/');

  const handleEdit = () => {
    if (product)
      navigate(`/edit-product/${productId}`, {
        state: { product },
      });
  };

  const handleAddToCart = () => {
    if (product) {
      addToShoppingCart(product);
    } else {
      alert(
        'An error occured while trying to add the item to the shopping cart!',
      );
    }
  };

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>The product cannot be found. Redirecting...</p>;
  }

  return (
    <>
      <div className="center-table-container">
        <div className="table-container">
          <div className="top-row">
            <Typography variant="h3">{`Product: ${product?.name}`}</Typography>
            <div className="top-row-buttons">
              <Button
                variant="contained"
                color="secondary"
                sx={{ mr: 1 }}
                onClick={handleBack}
              >
                BACK
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 1 }}
                onClick={handleEdit}
                disabled={!isAdmin}
              >
                EDIT
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 1 }}
                onClick={handleAddToCart}
              >
                <AddShoppingCartRounded />
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: theme.palette.red.main }}
                onClick={handleOpen}
                disabled={isDeleting || !isAdmin}
              >
                DELETE
              </Button>
            </div>
          </div>

          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Paper elevation={3}>
                <List>
                  <Tooltip title="Name of the product" arrow>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <AbcRounded />
                        </ListItemIcon>
                        <ListItemText primary={product.name} />
                      </ListItemButton>
                    </ListItem>
                  </Tooltip>

                  <Tooltip title="Name of the category" arrow>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <CategoryRounded />
                        </ListItemIcon>
                        <ListItemText primary={product.category.name} />
                      </ListItemButton>
                    </ListItem>
                  </Tooltip>

                  <Tooltip title="Price of the product" arrow>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <PaymentsRounded />
                        </ListItemIcon>
                        <ListItemText primary={`${product.price} RON`} />
                      </ListItemButton>
                    </ListItem>
                  </Tooltip>

                  <Tooltip title="Weight of the product" arrow>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <FitnessCenterRounded />
                        </ListItemIcon>
                        <ListItemText primary={`${product.weight} KG`} />
                      </ListItemButton>
                    </ListItem>
                  </Tooltip>

                  <Tooltip title="Supplier of the product" arrow>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <FactoryRounded />
                        </ListItemIcon>
                        <ListItemText primary={product.supplier} />
                      </ListItemButton>
                    </ListItem>
                  </Tooltip>

                  <Tooltip title="Description of the product" arrow>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <NotesRounded />
                        </ListItemIcon>
                        <ListItemText primary={product.description} />
                      </ListItemButton>
                    </ListItem>
                  </Tooltip>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <img
                style={{ maxWidth: '100%' }}
                src={product.imageUrl}
                alt="Image of the product"
              />
            </Grid>
          </Grid>
        </div>
      </div>

      {/* <div className={`${styles.detailsSeparated}`}>
            <div className={`${styles.detailsSeparatedLeft}`}>
              <p>{`Name: ${product?.name}`}</p>
              <p>{`Category: ${product?.category.name}`}</p>
              <p>{`Price: ${product?.price} RON`}</p>
            </div>
            <div className={`${styles.detailsSeparatedRight}`}>
              <img
                className={styles.detailsImage}
                src={product?.imageUrl}
                alt="Image of the product"
              />
            </div>
          </div>
          <div className={`${styles.description}`}>
            <p>{`Description: ${product?.description}`}</p>
          </div> */}

      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>
          {`Do you really want to delete ${product?.name}?`}
        </DialogTitle>
        <DialogContent>This process cannot be undone.</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={handleDialogAgree} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
