import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@shared/types';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
import { ChevronRight, Home, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
function ProductDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Skeleton className="w-full aspect-square rounded-lg" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-48" />
        </div>
      </div>
    </div>
  );
}
export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        setLoading(true);
        const data = await api<Product>(`/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        toast.error('Failed to load product.');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);
  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      toast.success(`${product.name} added to cart!`);
    }
  };
  if (loading) {
    return <Layout><ProductDetailsSkeleton /></Layout>;
  }
  if (error || !product) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="text-gray-600 mt-2">{error || 'Product not found.'}</p>
          <Button asChild className="mt-4">
            <Link to="/">Go back to Shop</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-brand-primary">
                  <Home className="h-4 w-4" /> Shop
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-brand-primary">{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col h-full"
          >
            <div className="flex-grow">
              <div className="flex items-center gap-4">
                <span className="inline-block bg-amber-100 text-brand-accent text-sm font-semibold px-3 py-1 rounded-full">{product.region}</span>
                <span className="inline-block bg-gray-200 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">{product.roast} Roast</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-primary mt-4">{product.name}</h1>
              <div className="flex items-center mt-4 gap-1 text-amber-500">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current text-gray-300" />
                <span className="text-gray-600 ml-2 text-sm">(123 reviews)</span>
              </div>
              <p className="mt-6 text-lg text-gray-700 leading-relaxed">{product.description}</p>
            </div>
            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center justify-between">
                <p className="text-4xl font-bold text-brand-primary">${product.price.toFixed(2)}</p>
                <Button 
                  size="lg" 
                  onClick={handleAddToCart}
                  style={{ backgroundColor: 'rgb(217, 119, 6)', color: 'white' }}
                  className="text-lg font-semibold hover:bg-amber-600 transform hover:scale-105 transition-transform duration-200"
                >
                  <ShoppingCart className="mr-2 h-6 w-6" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}