import { Component, signal, computed, effect } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 25000 },
    { id: 2, name: 'Headphones', price: 1500 },
    { id: 3, name: 'Keyboard', price: 1200 },
    { id: 4, name: 'Mouse', price: 700 }
  ];

  cart = signal<Product[]>([]);

  totalPrice = computed(() =>
    this.cart().reduce((sum, product) => sum + product.price, 0)
  );

  constructor() {
    effect(() => {
      console.log(`Cart items count: ${this.cart().length}`);
    });
  }

  addToCart(product: Product) {
    this.cart.update(items => [...items, product]);
  }

  removeFromCart(index: number) {
    this.cart.update(items => items.filter((_, i) => i !== index));
  }

  clearCart() {
    this.cart.set([]);
  }
} 