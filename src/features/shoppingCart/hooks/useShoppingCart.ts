import { useCallback, useState } from 'react';
import { OrderDTO } from '../../../types/Order';
import API_URLS, { API_BASE_URL } from '../../../lib/apiUrls';
import useAuthContext from '../../../hooks/useAuthContext';

export default function useShoppingCart() {
  const [checkoutLoading, setCheckOutLoading] = useState<boolean>(false);
  const { authData } = useAuthContext();

  const checkout = useCallback(
    async (order: OrderDTO, emptyShoppingCart: () => void) => {
      setCheckOutLoading(false);
      try {
        setCheckOutLoading(true);
        const response = await fetch(`${API_BASE_URL}${API_URLS.ORDERS}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authData.accessToken}`,
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
    [authData.accessToken],
  );

  return { checkout, checkoutLoading };
}
