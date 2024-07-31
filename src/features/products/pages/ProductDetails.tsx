import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/ProductDetails.module.css';
import { useEffect, useState } from 'react';
import useShoppingCartContext from '../../../hooks/useShoppingCartContext';
import useAuthContext from '../../../hooks/useAuthContext';
import {
  useDeleteProductMutation,
  useLazyGetProductQuery,
} from '../api/productApiSlice';
import { ProductDetailType } from '../../../types/ProductDetail';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const navigate = useNavigate();
  const { addToShoppingCart } = useShoppingCartContext();

  const location = useLocation();
  const { product: productFromState } = location.state || {};
  const { authData } = useAuthContext();

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
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
    if (isError) {
      alert(
        (error as { message: string }).message ||
          'Error fetching product details',
      );
      navigate('/products');
    }
  }, [isError, error, navigate]);

  const handleDelete = () => {
    if (!isFetching && !isDeleting && product) {
      const confirmDelete = confirm(
        `Do you really want to delete ${product?.name}?`,
      );
      if (confirmDelete) deleteProduct(product!.id);
    }
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
    <div className="center-table-container">
      <div className="table-container">
        <div className="top-row">
          <h1>{`Product: ${product?.name}`}</h1>
          <div className="top-row-buttons">
            <button
              className={`${styles.backButton} top-row-button`}
              onClick={handleBack}
            >
              BACK
            </button>
            <button
              className="top-row-button"
              onClick={handleEdit}
              disabled={authData.role !== 'admin'}
            >
              EDIT
            </button>
            <button className="top-row-button" onClick={handleAddToCart}>
              ADD TO CART
            </button>
            <button
              className={styles.deleteButton}
              onClick={handleDelete}
              disabled={isDeleting || authData.role !== 'admin'}
            >
              DELETE
            </button>
          </div>
        </div>

        <div className={`${styles.detailsSeparated}`}>
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
        </div>
      </div>
    </div>
  );
}
