import { Observer } from '../utils/observer.js';

export class CartModel {
  constructor() {
    this._cartItems = [];

    this._observer = new Observer();
  }

  addSubscriber(subscriber) {
    this._observer.subscribe(subscriber);
  }

  addCartItem(item) {
    this._cartItems.push(item);

    this._observer.notify();
  }

  getCartItems() {
    return this._cartItems;
  }

  updateCartItem(newItem) {
    const index = this._cartItems.findIndex((item) => item.id === newItem.id);

    this._cartItems = [
      ...this._cartItems.slice(0, index),
      newItem,
      ...this._cartItems.slice(index + 1)
    ];

    this._observer.notify();
  }

  removeCartItem(item) {
    this._cartItems = this._cartItems.filter((cartItem) => cartItem.id !== item.id);

    this._observer.notify();
  }
}
