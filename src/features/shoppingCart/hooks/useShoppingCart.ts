// import { useCallback, useState } from 'react';
// import useAxiosInstance from '../../../hooks/useAxiosInstance';
// import { ProductDetailType } from '../../../types/ProductDetail';

// export default function useShoppingCart() {
//   const [checkoutLoading, setCheckOutLoading] = useState<boolean>(false);
//   const axiosInstance = useAxiosInstance();

//   const checkout = useCallback(async (orderDetails: ProductDetailType) => {
//     setCheckOutLoading(false);
//     try {
//       const response = axiosInstance.post('/orders', {
//         customer: '33c5965f-e370-43af-8d9a-c877463f31b1',
//         createdAt: new Date(),
//         country: 'Romania',
//         city: 'Cluj-Napoca',
//         streetAddress: 'Strada Brassai Samuel 5',
//       });
//     } catch (error) {
//     } finally {
//       setCheckOutLoading(false);
//     }
//   }, []);
// }
