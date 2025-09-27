import type { Product } from '@shared/types';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        <Card className="overflow-hidden h-full flex flex-col group transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
          <CardHeader className="p-0">
            <div className="aspect-w-4 aspect-h-3">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
          </CardHeader>
          <CardContent className="p-6 flex-grow">
            <CardTitle className="text-2xl font-display font-bold text-brand-primary mb-2">{product.name}</CardTitle>
            <p className="text-gray-600 text-base line-clamp-3">{product.description}</p>
          </CardContent>
          <CardFooter className="p-6 flex justify-between items-center mt-auto">
            <p className="text-2xl font-bold text-brand-primary">${product.price.toFixed(2)}</p>
            <Button
              onClick={handleAddToCart}
              style={{ backgroundColor: 'rgb(217, 119, 6)', color: 'white' }}
              className="hover:bg-amber-600 active:scale-95 transition-transform duration-200"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}