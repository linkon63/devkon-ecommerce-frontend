export interface IProductImage {
  key: string;
  url: string;
}

export interface ProductSize {
  id: string;
  productId: string;
  title: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  original_price: number;
  discount_rate: number;
  production_cost: number;
  tax_rate: number;
  cover_image: IProductImage;
  product_images: IProductImage[];
  color: string;
  summary: string;
  contents: string;
  productSizes: ProductSize[];
}

export type TProduct = {
  id: string;
  sku: string;
  departmentId: string;
  categoryId: string;
  sub_categoryId: string;
  name: string;
  original_price: number;
  discount_rate: number;
  production_cost: number;
  tax_rate: number;
  cover_image: IProductImage;
  product_images: IProductImage[];
  color: string | null;
  summary: string | null;
  contents: string | null;
  status: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  productSizes: TProductSize[];
};

type TProductSize = {
  id: string;
  productId: string;
  title: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};

export type TProductDetails = {
  id: string;
  name: string;
  color: string | null;
  sku: string;
  sizes: TProductDetailsSize[] | [];
  cover_image: IProductImage;
  product_images: IProductImage[];
  original_price: number;
  discount_price: number;
  discount_rate: number;
  tax_price: number;
  selling_price: number;
  summary: string | null;
  contents: string | null;
};

export type TProductDetailsSize = {
  id: string;
  title: string;
  quantity: number;
};

// export enum Stock_Status {
//   IN_STOCK,
//   STOCK_OUT,
// }
// export enum Stock_Status : []

export enum StockStatus {
  IN_STOCK = "IN_STOCK",
  STOCK_OUT = "STOCK_OUT",
}

export type TCartProduct = {
  cart_id: string;
  name: string;
  sku: string;
  cover_image: IProductImage;
  size?: string | null;
  color?: string | null;
  quantity: number;
  original_price: number;
  discount_price: number;
  tax_price: number;
  total_price: number;
  // stock: "IN_STOCK" | "STOCK_OUT";
  stock: StockStatus;
};
