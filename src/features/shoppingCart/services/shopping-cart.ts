import { OrderDetailsInDto, OrderDTO } from '../../../types/Order';
import { ShoppingCartItemType } from '../../../types/ShoppingCart';

export function createOrderDetails(
  shoppingCart: ShoppingCartItemType[],
  customer: string,
): OrderDTO {
  const orderDetails: OrderDetailsInDto[] = [];
  shoppingCart.map((shoppingCartItem) => {
    orderDetails.push({
      shippedFrom: shoppingCartItem.location,
      productId: shoppingCartItem.product.id,
      quantity: shoppingCartItem.quantity,
    } as OrderDetailsInDto);
  });
  const order = {
    customer,
    createdAt: new Date(),
    country: 'Romania',
    city: 'Cluj-Napoca',
    county: 'Cluj',
    streetAddress: 'Strada Brassai Samuel 5',
    orderDetails,
  } as OrderDTO;
  return order;
}
