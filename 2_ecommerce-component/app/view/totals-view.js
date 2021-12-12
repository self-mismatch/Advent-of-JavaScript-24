import { AbstractView } from './abstract-view.js';
import { CURRENCY_SYMBOL, DECIMAL_COUNT, TAX_COEFFICIENT } from '../constants.js';

const getSubtotal = (cartItems) => cartItems.reduce((accumulator, currentValue) => accumulator += currentValue.count * Number(currentValue.price), 0);

const getTax = (subtotal, taxCoefficient) => subtotal * taxCoefficient;

const getTotal = (subtotal, tax) => subtotal + tax;

const getTotalsTemplate = (cartItems) => {
  const subtotal = getSubtotal(cartItems);
  const tax = getTax(subtotal, TAX_COEFFICIENT);
  const total = getTotal(subtotal, tax);

  return (`<div class="totals">
    <div class="line-item">
      <div class="label">Subtotal:</div>
      <div class="amount price subtotal">${CURRENCY_SYMBOL}${subtotal.toFixed(DECIMAL_COUNT)}</div>
    </div>
    <div class="line-item">
      <div class="label">Tax:</div>
      <div class="amount price tax">${CURRENCY_SYMBOL}${tax.toFixed(DECIMAL_COUNT)}</div>
    </div>
    <div class="line-item total">
      <div class="label">Total:</div>
      <div class="amount price total">${CURRENCY_SYMBOL}${total.toFixed(DECIMAL_COUNT)}</div>
    </div>
  </div>`)
};

export class TotalsView extends AbstractView {
  constructor(cartItems) {
    super();

    this._cartItems = cartItems;
  }

  _getTemplate() {
    return getTotalsTemplate(this._cartItems);
  }
}
