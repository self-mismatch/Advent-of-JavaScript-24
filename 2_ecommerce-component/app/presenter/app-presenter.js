import { CartModel } from '../model/cart-model.js';
import { MenuModel } from '../model/menu-model.js';

import { CartItemView } from '../view/cart-item-view.js';
import { CartListView } from '../view/cart-list-view.js';
import { EmptyCartView } from '../view/empty-cart-view.js';
import { MenuItemView } from '../view/menu-item-view.js';
import { TotalsView } from '../view/totals-view.js';

import { remove, render, replace } from '../utils/render.js';

import { mockMenuItems } from '../mocks.js';

export class AppPresenter {
  constructor(cartContainer, menuContainer) {
    this._cartContainer = cartContainer;
    this._menuContainer = menuContainer;

    this._cartModel = new CartModel();
    this._menuModel = new MenuModel();

    this._cartListView = new CartListView();
    this._emptyCartView = new EmptyCartView();
    this._totalsView = null;

    this._cartItemViews = {};
    this._menuItemViews = {};

    this._cartItems = null;
    this._menuItems = null;

    this._handleCartModelEvent = this._handleCartModelEvent.bind(this);
    this._handleMenuModelEvent = this._handleMenuModelEvent.bind(this);
    this._handleAddToCartClick = this._handleAddToCartClick.bind(this);
    this._handleQuantityChange = this._handleQuantityChange.bind(this);
  }

  init() {
    this._cartModel.addSubscriber(this._handleCartModelEvent);
    this._menuModel.addSubscriber(this._handleMenuModelEvent);

    this._menuModel.setMenuItems(mockMenuItems);

    this._cartItems = this._cartModel.getCartItems();
    this._menuItems = this._menuModel.getMenuItems();

    this._renderMenu();

    if (this._cartItems.length === 0) {
      this._renderEmptyCart();
    } else {
      this._renderCartList();
      this._renderTotals();
    }
  }

  _handleCartModelEvent() {
    this._cartItems = this._cartModel.getCartItems();

    if (this._cartItems.length === 0) {
      this._clearCart();

      this._renderEmptyCart();
    } else {
      remove(this._emptyCartView);

      if (!this._cartContainer.contains(this._cartListView.getElement())) {
        this._renderCartList();
      }

      this._clearCartList();
      this._renderCartItems();
      this._renderTotals();
    }
  }

  _handleMenuModelEvent(item) {
    this._menuItems = this._menuModel.getMenuItems();

    this._updateMenuItem(item);
  }

  _handleAddToCartClick(item) {
    const processedItem = {
      ...item,
      isInCart: true,
      count: 1,
    };

    this._menuModel.updateMenuItem(processedItem);
    this._cartModel.addCartItem(processedItem);
  }

  _handleQuantityChange(item) {
    if (item.count > 0) {
      this._menuModel.updateMenuItem(item);
      this._cartModel.updateCartItem(item);
    } else {
      this._menuModel.updateMenuItem({
        ...item,
        isInCart: false,
      });
      this._cartModel.removeCartItem(item);
    }
  }

  _renderMenu() {
    this._menuItems.forEach((menuItem) => {
      const menuItemView = new MenuItemView(menuItem);
      this._menuItemViews[menuItem.id] = menuItemView;
      menuItemView.setAddToCartClickHandler(this._handleAddToCartClick);
      render(menuItemView, this._menuContainer);
    });
  }

  _renderCartList() {
    render(this._cartListView, this._cartContainer)
  }

  _renderCartItem(cartItem) {
    if (cartItem.count === 0) {
      return;
    }

    const cartItemView = new CartItemView(cartItem);
    this._cartItemViews[cartItem.id] = cartItemView;
    cartItemView.setQuantityChangeHandler(this._handleQuantityChange);
    render(cartItemView, this._cartListView);
  }

  _renderCartItems() {
    this._cartItems.forEach((cartItem) => this._renderCartItem(cartItem));
  }

  _renderTotals() {
    if (this._totalsView) {
      remove(this._totalsView);
    }

    this._totalsView = new TotalsView(this._cartModel.getCartItems());
    render(this._totalsView, this._cartContainer);
  }

  _renderEmptyCart() {
    render(this._emptyCartView, this._cartContainer);
  }

  _updateMenuItem(item) {
    const menuItemView = new MenuItemView(item);
    menuItemView.setAddToCartClickHandler(this._handleAddToCartClick);
    replace(menuItemView, this._menuItemViews[item.id]);
    this._menuItemViews[item.id] = menuItemView;
  }

  _clearCartList() {
    Object.values(this._cartItemViews).forEach((cartItem) => remove(cartItem));
    this._cartItemViews = {};
  }

  _clearCart() {
    this._clearCartList();
    remove(this._cartListView);
    remove(this._totalsView);
  }
}
