'use server';

import { CartServiceFactory } from '@/services/cart.service';
import { redirect } from 'next/navigation';

export async function addToCartAction(formData: FormData) {
  const product_id = formData.get('product_id') as string;
  const quantity = parseInt(formData.get('quantity') as string);
  const cartService = CartServiceFactory.create();
  await cartService.addToCart({
    product_id,
    quantity,
  });
  redirect('/my-cart');
}

export async function removeItemFromCartAction(formData: FormData) {
  const cartService = CartServiceFactory.create();
  const index = parseInt(formData.get('index') as string);
  cartService.removeItemFromCart(index);
}
