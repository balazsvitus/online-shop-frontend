import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useProductDetails from '../hooks/useProductDetails';
import styles from '../styles/ProductDetails.module.css';
import { useEffect } from 'react';
import useShoppingCartContext from '../../../hooks/useShoppingCartContext';

export default function ProductDetails() {
  const { productId } = useParams();
  const {
    fetchProductDetails,
    productDetails,
    productDetailsLoading,
    deleteProduct,
    productDeleteLoading,
    setProductFromState,
  } = useProductDetails(productId!);
  const navigate = useNavigate();
  const { addToShoppingCart } = useShoppingCartContext();

  const location = useLocation();
  const { product } = location.state || {};

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
                    <button className="top-row-button" onClick={handleEdit}>
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
