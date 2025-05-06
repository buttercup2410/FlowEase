import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Loader2 } from "lucide-react";

type FlowType = "light" | "moderate" | "heavy" | "variable";

type FilterOption = {
  category: string;
  flowType: FlowType | "all";
  sort: "popular" | "price-low" | "price-high" | "eco";
};

interface ProductWithFlowTypes extends Omit<Product, 'flowTypes'> {
  flowTypes: FlowType[];
}

export default function Products() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductWithFlowTypes[]>([]);
  const [filters, setFilters] = useState<FilterOption>({
    category: "all",
    flowType: "all",
    sort: "popular",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch products
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const productsData = await response.json();
        
        // Fetch flow types for each product
        const productsWithFlowTypes = await Promise.all(
          productsData.map(async (product: Product) => {
            const flowTypesResponse = await fetch(`/api/products/${product.id}/flow-types`);
            const flowTypes = flowTypesResponse.ok ? await flowTypesResponse.json() : [];
            return { ...product, flowTypes: flowTypes as FlowType[] };
          })
        );
        
        setProducts(productsWithFlowTypes);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load products. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Product added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  // Filter and sort products
  const filteredProducts = products.filter((product) => {
    const categoryMatch = filters.category === "all" || product.category === filters.category;
    const flowMatch = filters.flowType === "all" || product.flowTypes.includes(filters.flowType);
    return categoryMatch && flowMatch;
  }).sort((a, b) => {
    switch(filters.sort) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "eco":
        return b.ecoRating - a.ecoRating;
      default: // popular
        return b.popularity - a.popularity;
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Products Available</AlertTitle>
          <AlertDescription>
            No products are currently available. Please try again later or contact support if this issue persists.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
      <h2 className="text-2xl font-bold text-foreground font-heading">Products</h2>
        <p className="text-muted-foreground">Browse our eco-friendly menstrual products</p>
      </div>

      {/* Filters */}
      <div className="bg-background rounded-xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="category-filter" className="text-muted-foreground mb-2 block">Category</Label>
            <Select
              value={filters.category}
              onValueChange={(value) => setFilters({ ...filters, category: value })}
            >
              <SelectTrigger id="category-filter" className="w-full">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="tampons">Tampons</SelectItem>
                <SelectItem value="pads">Pads</SelectItem>
                <SelectItem value="cups">Menstrual Cups</SelectItem>
                <SelectItem value="period-underwear">Period Underwear</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="flow-filter" className="text-muted-foreground mb-2 block">Flow Type</Label>
            <Select
              value={filters.flowType}
              onValueChange={(value: FlowType | "all") => setFilters({ ...filters, flowType: value })}
            >
              <SelectTrigger id="flow-filter" className="w-full">
                <SelectValue placeholder="All Flow Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Flow Types</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="heavy">Heavy</SelectItem>
                <SelectItem value="variable">Variable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="sort-filter" className="text-muted-foreground mb-2 block">Sort By</Label>
            <Select
              value={filters.sort}
              onValueChange={(value: "popular" | "price-low" | "price-high" | "eco") => 
                setFilters({ ...filters, sort: value })
              }
            >
              <SelectTrigger id="sort-filter" className="w-full">
                <SelectValue placeholder="Most Popular" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="eco">Eco Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No products match your filters. Try changing your selection.</p>
        </div>
      )}
    </div>
  );
}
