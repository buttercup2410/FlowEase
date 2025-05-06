import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FilterOption = {
  category: string;
  flowType: string;
  sort: "popular" | "price-low" | "price-high" | "eco";
};

export default function Products() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [filters, setFilters] = useState<FilterOption>({
    category: "",
    flowType: "",
    sort: "popular",
  });

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
    const categoryMatch = filters.category === "" || product.category === filters.category;
    const flowMatch = filters.flowType === "" || product.flowTypes.includes(filters.flowType as any);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 font-heading">Products</h2>
        <p className="text-gray-600">Browse our eco-friendly menstrual products</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="category-filter" className="text-gray-500 mb-2 block">Category</Label>
            <Select
              value={filters.category}
              onValueChange={(value) => setFilters({ ...filters, category: value })}
            >
              <SelectTrigger id="category-filter" className="w-full">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="tampons">Tampons</SelectItem>
                <SelectItem value="pads">Pads</SelectItem>
                <SelectItem value="cups">Menstrual Cups</SelectItem>
                <SelectItem value="period-underwear">Period Underwear</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="flow-filter" className="text-gray-500 mb-2 block">Flow Type</Label>
            <Select
              value={filters.flowType}
              onValueChange={(value) => setFilters({ ...filters, flowType: value })}
            >
              <SelectTrigger id="flow-filter" className="w-full">
                <SelectValue placeholder="All Flow Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Flow Types</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="heavy">Heavy</SelectItem>
                <SelectItem value="variable">Variable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="sort-filter" className="text-gray-500 mb-2 block">Sort By</Label>
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
          <p className="text-gray-600">No products match your filters. Try changing your selection.</p>
        </div>
      )}
    </div>
  );
}
