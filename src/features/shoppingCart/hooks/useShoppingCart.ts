import { useCallback, useState } from 'react';
import { OrderDTO } from '../../../types/Order';

export default function useShoppingCart() {
  const [checkoutLoading, setCheckOutLoading] = useState<boolean>(false);

  const checkout = useCallback(
    async (order: OrderDTO, emptyShoppingCart: () => void) => {
      setCheckOutLoading(false);
      try {
        setCheckOutLoading(true);
        const response = await fetch('http://localhost:3000/orders', {
          method: 'POST',
          body: JSON.stringify(order),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          emptyShoppingCart();
        }
      } catch (error) {
        alert('An error occured while checkout');
      } finally {
        setCheckOutLoading(false);
      }
    },
    [],
  );

  return { checkout, checkoutLoading };
}
