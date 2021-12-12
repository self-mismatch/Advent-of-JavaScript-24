import { AbstractView } from './abstract-view.js';

import { CURRENCY_SYMBOL, DECIMAL_COUNT } from '../constants.js';

const createCartItemTemplate = (itemInfo) => {
  const {count, imageAlt, imageName, name, price} = itemInfo;

  const calculatedPrice = count * Number(price);

  return (`<li>
    <div class="plate">
      <img src="images/${imageName}" alt="${imageAlt}" class="plate">
      <div class="quantity">${count}</div>
    </div>
    <div class="content">
      <p class="menu-item">${name}</p>
      <p class="price">${CURRENCY_SYMBOL}${price}</p>
    </div>
    <div class="quantity__wrapper">
      <button class="decrease">
        <img src="images/chevron.svg">
      </button>
      <div class="quantity">${count}</div>
      <button class="increase">
        <img src="images/chevron.svg">
      </button>
    </div>
    <div class="subtotal">
      ${CURRENCY_SYMBOL}${calculatedPrice.toFixed(DECIMAL_COUNT)}
    </div>
  </li>`);
};

export class CartItemView extends AbstractView {
  constructor(itemInfo) {
    super();

    this._itemInfo = itemInfo;

    this._quantityChangeHandler = this._quantityChangeHandler.bind(this);
  }

  setQuantityChangeHandler(callback) {
    this._callback.quantityChange = callback;
    this.getElement().querySelector('.quantity__wrapper').addEventListener('click', this._quantityChangeHandler);
  }

  _getTemplate() {
    return createCartItemTemplate(this._itemInfo);
  }

  _quantityChangeHandler(evt) {
    const target = evt.target;
    let button;

    if (target.tagName === 'BUTTON') {
      button = target;
    } else if (target.tagName === 'IMG') {
      button = target.parentElement;
    } else {
      return;
    }

    evt.preventDefault();

    let count = button.classList.contains('increase') ? this._itemInfo.count + 1 : this._itemInfo.count - 1;

    this._itemInfo = Object.assign({}, this._itemInfo, {count})
    this._callback.quantityChange(this._itemInfo);
  }
}
