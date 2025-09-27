import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Order } from '@shared/types';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
export function OrderConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const savedOrder = sessionStorage.getItem('lastOrder');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
      sessionStorage.removeItem('lastOrder');
    } else {
      // If no order data, redirect to home
      navigate('/');
    }
  }, [navigate]);
  if (!order) {
    return null; // or a loading spinner
  }
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="text-center shadow-xl">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-3xl font-display font-bold">Thank You For Your Order!</CardTitle>
              <p className="text-gray-600 mt-2">Your coffee is on its way. A confirmation email has been sent.</p>
            </CardHeader>
            <CardContent>
              <Separator className="my-6" />
              <h3 className="text-xl font-semibold mb-4 text-left">Order Summary</h3>
              <div className="space-y-3 text-left">
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <p>{item.name} (x{item.quantity})</p>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <p>Total Paid</p>
                <p>${order.total.toFixed(2)}</p>
              </div>
              <Button asChild size="lg" className="mt-8 w-full sm:w-auto" style={{ backgroundColor: 'rgb(217, 119, 6)', color: 'white' }}>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}