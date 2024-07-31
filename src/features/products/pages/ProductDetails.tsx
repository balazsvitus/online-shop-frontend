import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useProductDetails from '../hooks/useProductDetails';
import styles from '../styles/ProductDetails.module.css';
import { useEffect } from 'react';
import useShoppingCartContext from '../../../hooks/useShoppingCartContext';
import useAuthContext from '../../../hooks/useAuthContext';
import { useDeleteProductMutation } from '../api/productApiSlice';

export default function ProductDetails() {
  const { productId } = useParams();
  const {
    fetchProductDetails,
    productDetails,
    productDetailsLoading,
    setProductFromState,
  } = useProductDetails(productId!);
  const navigate = useNavigate();
  const { addToShoppingCart } = useShoppingCartContext();

  const location = useLocation();
  const { product } = location.state || {};
  const { authData } = useAuthContext();

  const [deleteProduct, { isLoading, isError, isSuccess, error }] =
    useDeleteProductMutation();

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
    if (isSuccess) {
      navigate('/products');
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      alert((error as { error: string }).error);
    }
  }, [isError, error]);

  const handleDelete = () => {
    if (!productDetailsLoading && !isLoading) {
      const result = confirm(
        `Do you really want to delete ${productDetails?.name}?`,
      );
      if (result) {
        deleteProduct(productDetails!.id);
      }
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleEdit = () => {
    navigate(`/edit-product/${productId}`, {
      state: { product: productDetails },
    });
  };

  const handleAddToCart = () => {
    if (productDetails) {
      addToShoppingCart(productDetails);
    } else {
      alert(
        'An error occured while trying to add the item to the shopping cart!',
      );
    }
  };

  return (
    <div
      className="center-table-container"
      style={productDetailsLoading ? { height: '100dvh' } : {}}
    >
      {productDetailsLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {!productDetails ? (
            <p>The product cannot be found. Redirecting...</p>
          ) : (
            <>
              <div className="table-container">
                <div className="top-row">
                  <h1>{`Product: ${productDetails?.name}`}</h1>
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
                    <button
                      className="top-row-button"
                      onClick={handleAddToCart}
                    >
                      ADD TO CART
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={handleDelete}
                      disabled={isLoading || authData.role !== 'admin'}
                    >
                      DELETE
                    </button>
                  </div>
                </div>

                <div className={`${styles.detailsSeparated}`}>
                  <div className={`${styles.detailsSeparatedLeft}`}>
                    <p>{`Name: ${productDetails?.name}`}</p>
                    <p>{`Category: ${productDetails?.category.name}`}</p>
                    <p>{`Price: ${productDetails?.price} RON`}</p>
                  </div>
                  <div className={`${styles.detailsSeparatedRight}`}>
                    <img
                      className={styles.detailsImage}
                      src={productDetails?.imageUrl}
                      alt="Image of the product"
                    />
                  </div>
                </div>
                <div className={`${styles.description}`}>
                  <p>{`Description: ${productDetails?.description}`}</p>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
