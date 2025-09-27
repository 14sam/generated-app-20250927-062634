import { Coffee, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
export function Footer() {
  return (
    <footer className="bg-brand-primary text-brand-background">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Coffee className="h-8 w-8 text-brand-background" />
              <span className="ml-3 text-2xl font-display font-bold">Aroma Edge</span>
            </div>
            <p className="text-gray-300 text-base">
              Premium artisanal coffee, delivered to your door.
            </p>
            <p className="text-sm text-gray-400">Built with ❤��� at Cloudflare</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-wider uppercase">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-gray-300 hover:text-white">All Coffee</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Subscriptions</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Equipment</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Shipping</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-wider uppercase">Stay Connected</h3>
            <p className="mt-4 text-base text-gray-300">Get the latest updates and offers.</p>
            <form className="mt-4 flex gap-2">
              <Input type="email" placeholder="Enter your email" className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
              <Button type="submit" style={{ backgroundColor: 'rgb(217, 119, 6)', color: 'white' }} className="hover:bg-amber-600">
                Sign Up
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} Aroma Edge. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-white"><Twitter /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Facebook /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Instagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}