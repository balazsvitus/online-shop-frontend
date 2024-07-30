import { useCallback, useState } from 'react';
import { OrderDTO } from '../../../types/Order';
import API_URLS, { API_BASE_URL } from '../../../lib/apiUrls';

export default function useShoppingCart() {
  const [checkoutLoading, setCheckOutLoading] = useState<boolean>(false);

  const checkout = useCallback(
    async (order: OrderDTO, emptyShoppingCart: () => void) => {
      setCheckOutLoading(false);
      try {
        setCheckOutLoading(true);
        const response = await fetch(`${API_BASE_URL}${API_URLS.ORDERS}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
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
