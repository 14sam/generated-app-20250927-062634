import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose, SheetDescription } from "@/components/ui/sheet";
import { useCartStore } from "@/store/cartStore";
import { Button } from "./ui/button";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { useNavigate } from "react-router-dom";
interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const navigate = useNavigate();
  const handleCheckout = () => {
    onOpenChange(false);
    navigate('/checkout');
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col bg-brand-background">
        <SheetHeader className="pr-12">
          <SheetTitle className="text-2xl font-display font-bold">Your Cart</SheetTitle>
          <SheetDescription className="sr-only">A summary of items in your shopping cart.</SheetDescription>
        </SheetHeader>
        <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
        </SheetClose>
        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-grow my-4 pr-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto border-t pt-4">
              <div className="w-full space-y-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button size="lg" className="w-full" style={{ backgroundColor: 'rgb(217, 119, 6)', color: 'white' }} onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
                <Button variant="outline" className="w-full" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <p className="text-xl text-gray-500">Your cart is empty.</p>
            <p className="text-gray-400 mt-2">Add some coffee to get started!</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}