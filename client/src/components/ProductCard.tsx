import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-background rounded-xl shadow-sm overflow-hidden border border-border">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.isEcoCertified && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
            ECO CERTIFIED
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
        
        <div className="mt-2 space-x-1">
          {product.flowTypes.map((type) => (
            <Badge 
              key={type} 
              variant="outline" 
              className="text-xs capitalize bg-background hover:bg-accent hover:text-accent-foreground"
            >
              {type}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
          <Button
            onClick={() => onAddToCart(product)}
            variant="secondary"
            className="bg-primary text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/70"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
