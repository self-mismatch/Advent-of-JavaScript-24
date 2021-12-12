import { createElement } from '../utils/render.js';

export class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }

    this._element = null;
    this._callback = {};
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  _getTemplate() {
    throw new Error('Abstract method not implemented: _getTemplate');
  }
}
