import { AbstractView } from './abstract-view.js';

const createMenuItemTemplate = (itemInfo) => {
  const {imageAlt, imageName, isInCart, name, price} = itemInfo;

  return (`<li>
    <div class="plate">
      <img src="images/${imageName}" alt="${imageAlt}" class="plate">
    </div>
    <div class="content">
      <p class="menu-item">${name}</p>
      <p class="price">$${price}</p>
      ${isInCart ?
    `<button class="in-cart">
       <img src="images/check.svg" alt="Check" />
       In Cart
     </button>` :
    `<button class="add">Add to Cart</button>`};
    </div>
  </li>`);
};

export class MenuItemView extends AbstractView {
  constructor(itemInfo) {
    super();

    this._itemInfo = itemInfo;

    this._addToCartClickHandler = this._addToCartClickHandler.bind(this);
  }

  setAddToCartClickHandler(callback) {
    if (this._itemInfo.isInCart) {
      return;
    }

    this._callback.addToCartClick = callback;
    this.getElement().querySelector('.add').addEventListener('click', this._addToCartClickHandler);
  }

  _getTemplate() {
    return createMenuItemTemplate(this._itemInfo);
  }

  _addToCartClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToCartClick(this._itemInfo);
  }
}
