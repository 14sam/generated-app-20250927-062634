import React from 'react';
import { Coffee, ShoppingCart, User as UserIcon, LogOut } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { CartSheet } from './CartSheet';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
export function Header() {
  const items = useCartStore((state) => state.items);
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const navigate = useNavigate();
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-brand-background/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <Coffee className="h-8 w-8 text-brand-primary" />
              <span className="ml-3 text-2xl font-display font-bold text-brand-primary">
                Aroma Edge
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-lg font-medium text-brand-primary hover:text-brand-accent transition-colors duration-200">Shop</Link>
              <a href="#" className="text-lg font-medium text-brand-primary hover:text-brand-accent transition-colors duration-200">Our Story</a>
              <a href="#" className="text-lg font-medium text-brand-primary hover:text-brand-accent transition-colors duration-200">Contact</a>
            </nav>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user?.name}`} alt={user?.name} />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500 focus:bg-red-50">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild variant="ghost" className="text-brand-primary hover:text-brand-accent">
                  <Link to="/login">Login</Link>
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full hover:bg-gray-200"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-6 w-6 text-brand-primary" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-white">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Open cart</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}