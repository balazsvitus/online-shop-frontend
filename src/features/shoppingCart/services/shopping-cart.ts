import { OrderDetailsInDto, OrderDTO } from '../../../types/Order';
import { ShoppingCartItemType } from '../../../types/ShoppingCart';

export function createOrderDetails(
  shoppingCart: ShoppingCartItemType[],
  shippedFrom: string,
): OrderDTO {
  const orderDetails: OrderDetailsInDto[] = [];
  shoppingCart.map((shoppingCartItem) => {
    orderDetails.push({
      shippedFrom,
      productId: shoppingCartItem.product.id,
      quantity: shoppingCartItem.quantity,
    });
  });
  const order = {
    customer: '33c5965f-e370-43af-8d9a-c877463f31b1',
    createdAt: new Date(),
    country: 'Romania',
    city: 'Cluj-Napoca',
    county: 'Cluj',
    streetAddress: 'Strada Brassai Samuel 5',
    orderDetails,
  } as OrderDTO;
  return order;
}
