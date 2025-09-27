import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Home, Truck } from 'lucide-react';
import { toast } from 'sonner';
const steps = [
  { id: 'shipping', name: 'Shipping', icon: <Truck className="h-5 w-5" /> },
  { id: 'payment', name: 'Payment', icon: <CreditCard className="h-5 w-5" /> },
  { id: 'review', name: 'Review', icon: <Home className="h-5 w-5" /> },
];
export function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { items, clearCart } = useCartStore();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = totalPrice * 0.08;
  const shipping = 5.00;
  const grandTotal = totalPrice + tax + shipping;
  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const handleConfirmOrder = () => {
    const orderDetails = {
      items,
      total: grandTotal,
      date: new Date().toISOString(),
    };
    sessionStorage.setItem('lastOrder', JSON.stringify(orderDetails));
    clearCart();
    toast.success('Order placed successfully!');
    navigate('/order-confirmation');
  };
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-display font-bold text-center mb-12">Checkout</h1>
        <div className="mb-8">
          <ol className="flex items-center justify-center space-x-4">
            {steps.map((step, index) => (
              <li key={step.id} className="flex items-center">
                <div className={`flex items-center ${index <= currentStep ? 'text-brand-accent' : 'text-gray-400'}`}>
                  <span className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${index <= currentStep ? 'border-brand-accent' : 'border-gray-400'}`}>
                    {step.icon}
                  </span>
                  <span className="ml-2 font-medium">{step.name}</span>
                </div>
                {index < steps.length - 1 && <div className="w-16 h-0.5 bg-gray-300 mx-4" />}
              </li>
            ))}
          </ol>
        </div>
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div><Label htmlFor="name">Full Name</Label><Input id="name" defaultValue={user?.name} /></div>
                      <div><Label htmlFor="email">Email</Label><Input id="email" type="email" defaultValue={user?.email} /></div>
                      <div className="md:col-span-2"><Label htmlFor="address">Address</Label><Input id="address" /></div>
                      <div><Label htmlFor="city">City</Label><Input id="city" /></div>
                      <div><Label htmlFor="state">State</Label><Input id="state" /></div>
                      <div><Label htmlFor="zip">ZIP Code</Label><Input id="zip" /></div>
                    </div>
                  </div>
                )}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
                    <div className="space-y-6">
                      <div><Label htmlFor="card-name">Name on Card</Label><Input id="card-name" defaultValue={user?.name} /></div>
                      <div><Label htmlFor="card-number">Card Number</Label><Input id="card-number" placeholder="���••• •••• •••• ••••" /></div>
                      <div className="grid grid-cols-2 gap-6">
                        <div><Label htmlFor="expiry">Expiry Date</Label><Input id="expiry" placeholder="MM/YY" /></div>
                        <div><Label htmlFor="cvc">CVC</Label><Input id="cvc" placeholder="•••" /></div>
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-6">Order Review</h2>
                    <div className="space-y-4">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                            <div>
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-6" />
                    <div className="space-y-2">
                      <div className="flex justify-between"><p>Subtotal</p><p>${totalPrice.toFixed(2)}</p></div>
                      <div className="flex justify-between"><p>Taxes</p><p>${tax.toFixed(2)}</p></div>
                      <div className="flex justify-between"><p>Shipping</p><p>${shipping.toFixed(2)}</p></div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold text-lg"><p>Grand Total</p><p>${grandTotal.toFixed(2)}</p></div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>Back</Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext} style={{ backgroundColor: 'rgb(217, 119, 6)', color: 'white' }}>Next</Button>
          ) : (
            <Button onClick={handleConfirmOrder} style={{ backgroundColor: 'rgb(60, 42, 33)', color: 'white' }}>Confirm Order</Button>
          )}
        </div>
      </div>
    </Layout>
  );
}