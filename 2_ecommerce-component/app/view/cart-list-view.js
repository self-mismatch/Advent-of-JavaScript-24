import { AbstractView } from './abstract-view.js';

const getCartListTemplate = () => `<ul class="cart-summary"></ul>`;

export class CartListView extends AbstractView {
  _getTemplate() {
    return getCartListTemplate();
  }
}
