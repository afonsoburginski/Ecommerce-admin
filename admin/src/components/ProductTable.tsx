import { useState } from "react";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductRoot from "@/components/product/ProductRoot";
import { useProducts } from "@/contexts/ProductContext";
import { useToast } from "@/components/ui/use-toast";
import React from "react";

// Definir o estado como Product | null
export default function ProductTable({ status }: { status: string }) {
  const { products, isLoading, isError, mutateProducts } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Ajuste aqui
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();

  if (!Array.isArray(products) || products.length === 0) {
    return <div>No products available.</div>;
  }

  const normalizedStatus = status.toUpperCase();
  const filteredProducts =
    normalizedStatus === "ALL"
      ? products
      : products.filter(
          (product) => product.status.toUpperCase() === normalizedStatus
        );

  const getBadgeVariant = (status: string) => {
    switch (status.toUpperCase()) {
      case "ACTIVE":
        return "success";
      case "DRAFT":
        return "warning";
      case "ARCHIVED":
        return "outline";
      default:
        return "outline";
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product); // Produto selecionado
    setIsSheetOpen(true);
  };

  const handleToggleProductStatus = async (product: Product) => {
    const newStatus = product.status === "ACTIVE" ? "ARCHIVED" : "ACTIVE";

    try {
      const response = await fetch(`/api/products`, {
        method: "PUT",
        body: JSON.stringify({
          id: product.id,
          status: newStatus,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Falha ao mudar o status para ${newStatus}`
        );
      }

      await mutateProducts();

      toast({
        title: `Produto ${
          newStatus === "ARCHIVED" ? "arquivado" : "ativado"
        } com sucesso.`,
        variant: "success",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      console.error(`Erro ao mudar o status para ${newStatus}:`, errorMessage);
      toast({
        title: `Erro ao mudar o status para ${newStatus}.`,
        description: `Ocorreu um erro: ${errorMessage}`,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Preço</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="hidden md:table-cell">Categories</TableHead>
                <TableHead className="hidden md:table-cell">Tags</TableHead>
                <TableHead className="hidden md:table-cell">Created at</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={product.images[0] || "/placeholder.svg"}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(product.status)}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.description}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.categories.map((category) => category.name).join(", ")}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.tags.map((tag) => (
                      <Badge key={tag.id} variant="default" className="mr-1">
                        {tag.name}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(product.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleEditProduct(product)} // Abre o sheet para editar
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleProductStatus(product)}>
                          {product.status === "ACTIVE" ? "Arquivar" : "Ativar"}
                        </DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>{filteredProducts.length}</strong> products
          </div>
        </CardFooter>
      </Card>

      {isSheetOpen && (
        <ProductRoot
          product={selectedProduct || undefined} // Se null, passar undefined
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
        />
      )}
    </>
  );
}
