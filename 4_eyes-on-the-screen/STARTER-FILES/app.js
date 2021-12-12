'use strict';

const JIGGLE_CLASS = 'jiggle';

const getRandomNumber = (min = 0, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const keys = document.querySelectorAll('.key');
let currentJigglingKey = null;

const startJiggleRandomKey = () => {
  const randomKeyIndex = getRandomNumber(0, keys.length - 1);
  currentJigglingKey = keys[randomKeyIndex];

  currentJigglingKey.classList.add(JIGGLE_CLASS);
};

const stopJiggleCurrentKey = () => {
  currentJigglingKey.classList.remove(JIGGLE_CLASS);
  currentJigglingKey = null;
};

const keyDownHandler = (evt) => {
  if (!currentJigglingKey) {
    return;
  }

  evt.preventDefault();

  if (evt.key.toUpperCase() === currentJigglingKey.dataset.key) {
    stopJiggleCurrentKey();
    startJiggleRandomKey();
  }
};

window.addEventListener('keydown', keyDownHandler);

startJiggleRandomKey();
