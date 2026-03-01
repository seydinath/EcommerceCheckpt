import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus, Package, Inbox } from "lucide-react";
import { toApiURL } from "@/lib/api";

interface ProductItem {
  _id: string;
  title: string;
  price: number;
  category: string;
  stock?: number;
  images?: string[];
  rating?: number;
  isOrganic?: boolean;
  unit?: string;
}

const MyProducts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["my-products"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/my-products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to load products");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to delete product");
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["my-products"] });
      setProductToDelete(null);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete product",
      });
    },
  });

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      deleteMutation.mutate(productToDelete);
    }
  };

  // Filter products
  const filteredProducts = products.filter((product: ProductItem) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      product.category.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(
    new Set(products.map((p: ProductItem) => p.category))
  );

  // Check if user is seller/farmer
  if (!user || (user.role !== "seller" && user.role !== "farmer")) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">
              Only sellers and farmers can manage products.
            </p>
            <Button asChild>
              <a href="/">Go Home</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">My Products</h1>
            </div>
            <Button asChild size="lg" className="gap-2">
              <a href="/products/create">
                <Plus className="h-5 w-5" />
                Create New Product
              </a>
            </Button>
          </div>
          <p className="text-muted-foreground mt-2">
            Manage all your agricultural products and inventory
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{products.length}</div>
                <p className="text-sm text-muted-foreground mt-1">Total Products</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {products.filter((p: ProductItem) => p.isOrganic).length}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Organic</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {products.reduce((sum: number, p: ProductItem) => sum + (p.stock || 0), 0)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Total Stock</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search products..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="h-11"
            />
          </div>
          <Select value={categoryFilter || "all"} onValueChange={(value) =>
            setCategoryFilter(value === "all" ? null : value)
          }>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat: string) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="text-sm text-muted-foreground flex items-center">
            Showing {filteredProducts.length} of {products.length}
          </div>
        </div>

        {/* Products List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-muted-foreground">Loading your products...</div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Inbox className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="font-semibold mb-2">No products found</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {searchFilter || categoryFilter
                    ? "No products match your filters. Try adjusting your search."
                    : "Start by creating your first product!"}
                </p>
                <Button asChild>
                  <a href="/products/create">Create Product</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product: ProductItem) => (
              <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Product Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={toApiURL(product.images[0])}
                      alt={product.title}
                      className="h-full w-full object-cover hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-2">
                    {product.isOrganic && (
                      <Badge className="bg-green-500">Organic</Badge>
                    )}
                    <Badge className="bg-blue-500">{product.unit || "kg"}</Badge>
                  </div>
                </div>

                {/* Product Details */}
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-2">{product.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">{product.price.toFixed(2)} F CFA</p>
                      <p className="text-xs text-muted-foreground">
                        Stock: {product.stock || 0} {product.unit || "units"}
                      </p>
                    </div>
                    {product.rating && (
                      <div className="text-right">
                        <p className="font-semibold">{product.rating.toFixed(1)}</p>
                        <p className="text-xs text-muted-foreground">Rating</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <a href={`/product/${product._id}/edit`}>
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </a>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setProductToDelete(product._id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!productToDelete} onOpenChange={(open) => !open && setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Keep It</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Product
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyProducts;
