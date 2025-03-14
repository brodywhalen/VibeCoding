export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
}

export interface Filter {
  category: string;
  size: string;
  color: string;
} 