import { useNavigate } from 'react-router-dom';
import styles from '../styles/Products.module.css';
import { ProductDetailType } from '../../../types/ProductDetail';

type ProductsTableItemProps = {
  product: ProductDetailType;
};

export default function ProductsTableItem({ product }: ProductsTableItemProps) {
  const navigate = useNavigate();

  const handleNavigate = (productId: string) => {
    navigate(`${productId}`, { state: { product } });
  };

  return (
    <tr>
      <td>{product.category.name}</td>
      <td>{product.name}</td>
      <td>{product.price} RON</td>
      <td
        className={`${styles.rowNavigationButton}`}
        onClick={() => handleNavigate(product.id)}
      >
        {'>'}
      </td>
    </tr>
  );
}
