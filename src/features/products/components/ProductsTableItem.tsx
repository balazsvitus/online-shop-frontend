import { useNavigate } from 'react-router-dom';
import { Stock } from '../../../types/Stock';
import styles from '../styles/products.module.css';

type ProductsTableItemProps = {
  stock: Stock;
};

export default function ProductsTableItem({ stock }: ProductsTableItemProps) {
  const navigate = useNavigate();

  const handleNavigate = (productId: string, locationId: string) => {
    navigate(`${productId}/${locationId}`);
  };

  return (
    <tr>
      <td>{stock.product.category.name}</td>
      <td>{stock.product.name}</td>
      <td>{stock.product.price} RON</td>
      <td>{stock.location.name}</td>
      <td
        className={`${styles.rowNavigationButton}`}
        onClick={() => handleNavigate(stock.product.id, stock.location.id)}
      >
        {'>'}
      </td>
    </tr>
  );
}
