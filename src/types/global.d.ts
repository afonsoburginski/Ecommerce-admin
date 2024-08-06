// src/types/global.d.ts

export {};

declare global {
  type Payment = {
    id: string;
    amount: number;
    status: string;
    email: string;
    customer: string;
    date: string;
  };

  interface Product {
    id: number;
    name: string;
    status: string;
    price: number;
    stock: number;
    sku: string;
    description: string;
    categories: { id: number; name: string }[];
    tags: { id: number; name: string }[];
    createdAt: string;
  }

  interface ProductContextType {
    products: Product[];
    isLoading: boolean;
    isError: any;
  }
}