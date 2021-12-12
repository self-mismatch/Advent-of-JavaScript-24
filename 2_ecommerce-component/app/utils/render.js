import { AbstractView } from '../view/abstract-view.js';

const createElement = (template) => {
  const container = document.createElement(`div`);
  container.innerHTML = template.trim();

  return container.firstChild;
}

const render = (element, container) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (element instanceof AbstractView) {
    element = element.getElement();
  }

  container.append(element);
};

const replace = (newElement, oldElement) => {
  const {parentElement} = oldElement.getElement();
  parentElement.replaceChild(newElement.getElement(), oldElement.getElement());
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export { createElement, remove, render, replace };
