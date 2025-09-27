// Base types for API responses
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// Demo types from boilerplate
export type User = { id: string; name: string };
export type Chat = { id: string; title: string };
export type ChatMessage = { id: string; chatId: string; userId: string; text: string; ts: number };
// Aroma Edge E-commerce Types
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  region: 'South America' | 'Africa' | 'Asia';
  roast: 'Light' | 'Medium' | 'Dark';
};
export type CartItem = Product & {
  quantity: number;
};
// Auth & Order Types
export type AuthUser = {
  id: string;
  name: string;
  email: string;
};
export type Order = {
  items: CartItem[];
  total: number;
  date: string;
};