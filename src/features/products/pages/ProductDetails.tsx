import { useNavigate, useParams } from 'react-router-dom';
import useProductDetails from '../hooks/useProductDetails';
import styles from '../styles/productDetails.module.css';
import { useEffect } from 'react';
import useShoppingCart from '../../../hooks/useShoppingCart';

export default function ProductDetails() {
  const { productId, locationId } = useParams();
  const {
    productDetails,
    productDetailsLoading,
    deleteProduct,
    productDeleteError,
    productDeleteLoading,
  } = useProductDetails(productId!, locationId!);
  const navigate = useNavigate();
  const { addToShoppingCart } = useShoppingCart();

  useEffect(() => {
    if (!productDetailsLoading && !productDetails) {
      navigate('/products', { replace: true });
    }
  }, [navigate, productDetails, productDetailsLoading]);

  useEffect(() => {
    if (productDeleteError) {
      alert(
        `An error occured while performing the delete operation: ${productDeleteError}`,
      );
    }
  }, [productDeleteError]);

  const handleDelete = () => {
    if (!productDetailsLoading && !productDeleteLoading) {
      const result = confirm(
        `Do you really want to delete ${productDetails?.product.name}?`,
      );
      if (result) {
        deleteProduct(navigate);
      }
    }
  };

  const handleBack = () => {
    navigate('/');
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
      className={`${styles.centerDetailsContainer}`}
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
              <div className={`${styles.detailsContainer}`}>
                <div className={`${styles.topRow}`}>
                  <h1>{`Product: ${productDetails?.product.name}`}</h1>
                  <div className={`${styles.topRowButtons}`}>
                    <button className={styles.backButton} onClick={handleBack}>
                      BACK
                    </button>
                    <button>EDIT</button>
                    <button onClick={handleAddToCart}>ADD TO CART</button>
                    <button
                      className={styles.deleteButton}
                      onClick={handleDelete}
                      disabled={productDeleteLoading}
                    >
                      DELETE
                    </button>
                  </div>
                </div>

                <div className={`${styles.detailsSeparated}`}>
                  <div className={`${styles.detailsSeparatedLeft}`}>
                    <p>{`Name: ${productDetails?.product.name}`}</p>
                    <p>{`Category: ${productDetails?.product.category.name}`}</p>
                    <p>{`Price: ${productDetails?.product.price} RON`}</p>
                  </div>
                  <div className={`${styles.detailsSeparatedRight}`}>
                    <img
                      className={styles.detailsImage}
                      src={productDetails?.product.imageUrl}
                      alt="Image of the product"
                    />
                  </div>
                </div>
                <div className={`${styles.description}`}>
                  <p>{`Description: ${productDetails?.product.description}`}</p>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
