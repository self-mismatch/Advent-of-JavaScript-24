import { AbstractView } from './abstract-view.js';

const getEmptyCartTemplate = () => `<p class="empty">Your cart is empty.</p>`;

export class EmptyCartView extends AbstractView {
  _getTemplate() {
    return getEmptyCartTemplate();
  }
}
