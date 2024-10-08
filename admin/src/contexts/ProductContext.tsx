// src/contexts/ProductContext.tsx
"use client";

import React, { createContext, ReactNode, useContext } from "react";
import { useProductData } from "@/hooks/useProductData";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { products, categories, tags, isLoading, error, mutateProducts, mutateCategories, mutateTags, mutateTopSellingProducts } = useProductData();

  return (
    <ProductContext.Provider value={{ products, categories, tags, isLoading, isError: !!error, mutateProducts, mutateCategories, mutateTags, mutateTopSellingProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }

  const { products, categories, tags, isLoading, isError, mutateProducts, mutateCategories, mutateTags, mutateTopSellingProducts } = context;

  return { products, categories, tags, isLoading, isError, mutateProducts, mutateCategories, mutateTags, mutateTopSellingProducts };
};
