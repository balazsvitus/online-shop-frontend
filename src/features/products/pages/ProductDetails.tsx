import { useNavigate, useParams } from 'react-router-dom';
import useProductDetails from '../hooks/useProductDetails';
import styles from '../styles/productDetails.module.css';
import { useEffect } from 'react';
import useShoppingCart from '../../../hooks/useShoppingCart';

export default function ProductDetails() {
  const { id } = useParams();
  const {
    productDetails,
    productDetailsLoading,
    deleteProduct,
    productDeleteError,
    productDeleteLoading,
  } = useProductDetails(id!);
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
        `Do you really want to delete ${productDetails?.name}?`,
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
                  <h1>{`Product: ${productDetails?.name}`}</h1>
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
                    <p>{`Name: ${productDetails?.name}`}</p>
                    <p>{`Category: ${productDetails?.category.name}`}</p>
                    <p>{`Price: ${productDetails?.price} RON`}</p>
                  </div>
                  <div className={`${styles.detailsSeparatedRight}`}>
                    <img
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

{
  /* {productDetailsLoading ? (
      <p>Loading product details...</p>
    ) : (
      <div className="details">
        <div>{productDetails?.id}</div>
        <div>{productDetails?.name}</div>
        <div>{productDetails?.description}</div>
        <div>{productDetails?.price} RON</div>
        <div>{productDetails?.weight} KG</div>
        <div>{productDetails?.supplier}</div>
        <div>{productDetails?.imageUrl}</div>
        <div>{productDetails?.category.name}</div>
      </div>
    )} */
}
