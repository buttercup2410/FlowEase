import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.isEcoCertified && (
          <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
            ECO CERTIFIED
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        
        <div className="mt-2 space-x-1">
          {product.flowTypes.map((type) => (
            <Badge key={type} variant="outline" className="text-xs capitalize">
              {type}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
          <Button
            variant="secondary"
            className="bg-primary/10 text-primary hover:bg-primary/20"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
