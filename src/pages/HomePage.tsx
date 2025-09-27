import React, { useState, useMemo, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { FilterSidebar, FilterState } from '@/components/FilterSidebar';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api-client';
import type { Product } from '@shared/types';
import { Skeleton } from '@/components/ui/skeleton';
function HeroSection() {
  return (
    <section className="relative bg-brand-primary text-brand-background py-24 md:py-32 lg:py-48">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d713b20e47b?q=80&w=2670&auto=format&fit=crop')" }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight"
        >
          Discover Artisanal Coffee
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300"
        >
          Experience the world's finest single-origin beans, roasted to perfection and delivered fresh to your door.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10"
        >
          <Button size="lg" style={{ backgroundColor: 'rgb(217, 119, 6)', color: 'white' }} className="text-lg font-semibold hover:bg-amber-600 transform hover:scale-105 transition-transform duration-200">
            Shop Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-1/4" />
        </div>
      ))}
    </div>
  );
}
export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [10, 30],
    regions: [],
    roasts: [],
  });
  const isMobile = useIsMobile();
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await api<Product[]>('/api/products');
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const regionMatch = filters.regions.length === 0 || filters.regions.includes(product.region);
      const roastMatch = filters.roasts.length === 0 || filters.roasts.includes(product.roast);
      return priceMatch && regionMatch && roastMatch;
    });
  }, [filters, products]);
  const FilterComponent = <FilterSidebar filters={filters} setFilters={setFilters} />;
  return (
    <Layout>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          {isMobile ? (
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" className="lg:hidden mb-6 flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="p-6">
                <DrawerHeader>
                  <DrawerTitle>Filter Products</DrawerTitle>
                  <DrawerDescription>Refine your search for the perfect coffee.</DrawerDescription>
                </DrawerHeader>
                {FilterComponent}
              </DrawerContent>
            </Drawer>
          ) : (
            <div className="hidden lg:block lg:w-1/4">
              {FilterComponent}
            </div>
          )}
          <main className="w-full lg:w-3/4">
            {loading ? (
              <ProductGridSkeleton />
            ) : error ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-red-600">An Error Occurred</h3>
                <p className="text-gray-500 mt-2">{error}</p>
              </div>
            ) : (
              <AnimatePresence>
                {filteredProducts.length > 0 ? (
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                  >
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16"
                  >
                    <h3 className="text-2xl font-semibold text-brand-primary">No Products Found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
}