export type CartProduct = {
  _id: string;
  name: string;
  price: string;
  description: any;
  quantity: number;
  totalPrice: number;
};

export type Cart = {
  items: CartProduct[];
  totalQuantity: number;
  totalAmount: number;
};
