import { AppPresenter } from './app/presenter/app-presenter.js';

const cart = document.querySelector('.cart')
const menu = document.querySelector('.menu');

const appPresenter = new AppPresenter(cart, menu);
appPresenter.init();
