// Example: src/components/product/ProductDetails.tsx

import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProductDetailsProps {
  productData: Product;
  setProductData: Dispatch<SetStateAction<Product>>;
}

export default function ProductDetails({ productData, setProductData }: ProductDetailsProps) {
  const [priceInput, setPriceInput] = useState<string>(formatPrice(productData.price || 0));

  useEffect(() => {
    setPriceInput(formatPrice(productData.price || 0));
  }, [productData.price]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^\d]/g, '');
    const priceValue = Number(inputValue) / 100;
    setProductData({ ...productData, price: priceValue });
    setPriceInput(formatPrice(priceValue));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, name: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProductData({ ...productData, description: e.target.value });
  };

  function formatPrice(value: number): string {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>
          {productData.name ? "Edit the product details below." : "Enter the product details below."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                className="w-full"
                value={productData.name}
                onChange={handleNameChange}
              />
            </div>
            <div className="w-40">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="text"
                className="w-full"
                value={priceInput}
                onChange={handlePriceChange}
              />
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={productData.description}
              onChange={handleDescriptionChange}
              className="min-h-32"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
