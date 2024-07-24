import { useNavigate } from 'react-router-dom';
import { ProductDetailType } from '../../../types/ProductDetail';
import styles from '../styles/products.module.css';

type ProductsTableItemType = {
  product: ProductDetailType;
};

export default function ProductsTableItem({ product }: ProductsTableItemType) {
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(id);
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
