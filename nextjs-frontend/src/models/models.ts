export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category_id: string;
  image_url: string;
  price: number;
};

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}

export type Order = {
  id: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  created_at: string;
};

export type OrderItem = {
  id: number;
  quantity: number;
  price: number;
  product: Product;
};

export type Cart = {
  items: CartItem[];
  total: number;
};

export type CartItem = {
  product_id: string;
  quantity: number;
  total: number;
};
