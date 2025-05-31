export interface IOrderList {
  id: string;
  orderId: string;
  transactionId: string;
  buyer_name: string;
  buyer_phone: string;
  buyer_email: string;
  clientId: string;
  shippingInfoId: string;
  delivery_charge: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  deliveryStatus: string;
  createdAt: string;
  updatedAt: string;
  products: IOrderProduct[];
}

export interface IOrderProduct {
  id: string;
  orderId: string;
  name: string;
  sku: string;
  size: string;
  cover_image: ICoverImage;
  quantity: number;
  original_price: number;
  discount_rate: number;
  discount_price: number;
  tax_rate: number;
  tax_price: number;
  production_cost: number;
  selling_price: number;
  createdAt: string;
  updatedAt: string;
}

interface ICoverImage {
  key: string;
  url: string;
}


type TOrderProductDataType={
  cover_image: {
    key: string,
    url: string
  };
  discount_price: number;
  discount_rate: number;
  id: string;
  name: string;
  orderId : string
  original_price: number;
  production_cost: number;
  quantity: number
  selling_price : number;
  sku : string;
  tax_price : number;
  tax_rate: number;
  size: string;
}

export type TOrderDataType = {
  id: string;
  orderId: string;
  transactionId: string;
  buyer_name: string;
  buyer_phone: string;
  buyer_email: string;
  delivery_charge: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  deliveryStatus: string;
  products: TOrderProductDataType[];
  createdAt: string;
};