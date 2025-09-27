import type { User, Chat, ChatMessage, Product } from './types';
export const MOCK_USERS: ReadonlyArray<User> = [
  { id: 'u1', name: 'Alice' },
  { id: 'u2', name: 'Bob' },
  { id: 'u3', name: 'Charlie' },
];
export const MOCK_CHATS: ReadonlyArray<Chat> = [
  { id: 'c1', title: 'General' },
  { id: 'c2', title: 'Random' },
];
export const MOCK_CHAT_MESSAGES: ReadonlyArray<ChatMessage> = [
  { id: 'm1', chatId: 'c1', userId: 'u1', text: 'Hello!', ts: Date.now() - 20000 },
  { id: 'm2', chatId: 'c1', userId: 'u2', text: 'Hi there!', ts: Date.now() - 10000 },
  { id: 'm3', chatId: 'c2', userId: 'u3', text: 'Anyone here?', ts: Date.now() - 5000 },
];
export const MOCK_PRODUCTS: ReadonlyArray<Product> = [
  {
    id: '1',
    name: 'Ethiopian Yirgacheffe',
    description: 'Bright, fruity, and floral notes with a light body and a clean finish. A true classic.',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1559493249-0c19480a3c28?q=80&w=2574&auto=format&fit=crop',
    region: 'Africa',
    roast: 'Light',
  },
  {
    id: '2',
    name: 'Colombian Supremo',
    description: 'A well-balanced coffee with notes of caramel, chocolate, and a hint of citrus.',
    price: 16.50,
    image: 'https://images.unsplash.com/photo-1611771341253-bad2899b8b24?q=80&w=2574&auto=format&fit=crop',
    region: 'South America',
    roast: 'Medium',
  },
  {
    id: '3',
    name: 'Sumatra Mandheling',
    description: 'Earthy and complex with a heavy body, low acidity, and notes of dark chocolate and spice.',
    price: 17.75,
    image: 'https://images.unsplash.com/photo-1599160219458-f68ed606434c?q=80&w=2574&auto=format&fit=crop',
    region: 'Asia',
    roast: 'Dark',
  },
  {
    id: '4',
    name: 'Kenya AA',
    description: 'Bold and vibrant with a rich body, bright acidity, and notes of blackcurrant and wine.',
    price: 19.50,
    image: 'https://images.unsplash.com/photo-1590099036142-b03b3b3b3b3b?q=80&w=2574&auto=format&fit=crop',
    region: 'Africa',
    roast: 'Medium',
  },
  {
    id: '5',
    name: 'Brazil Santos',
    description: 'Smooth and nutty with a mild acidity and a creamy body. Perfect for espresso.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1511920183353-3c7c95a5742a?q=80&w=2574&auto=format&fit=crop',
    region: 'South America',
    roast: 'Medium',
  },
  {
    id: '6',
    name: 'Guatemala Antigua',
    description: 'Full-bodied and rich with complex notes of cocoa, spice, and a smoky finish.',
    price: 17.25,
    image: 'https://images.unsplash.com/photo-1604537466573-5e945089a352?q=80&w=2574&auto=format&fit=crop',
    region: 'South America',
    roast: 'Dark',
  },
];