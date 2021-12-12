import { Observer } from '../utils/observer.js';

export class MenuModel {
  constructor() {
    this._menuItems = [];

    this._observer = new Observer();
  }

  addSubscriber(subscriber) {
    this._observer.subscribe(subscriber);
  }

  setMenuItems(items) {
    this._menuItems = items.slice();
  }

  getMenuItems() {
    return this._menuItems;
  }

  updateMenuItem(updatedItem) {
    const index = this._menuItems.findIndex((item) => item.id === updatedItem.id);

    this._menuItems = [
      ...this._menuItems.slice(0, index),
      updatedItem,
      ...this._menuItems.slice(index + 1)
    ];

    this._observer.notify(updatedItem);
  }
}
