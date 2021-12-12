'use strict';

const piano = document.querySelector('.piano');
const keys = Array.from(piano.querySelectorAll('[class*="-keys"]')).map((key) => key.parentElement);

piano.addEventListener('click', (evt) => {
  const target = evt.target;

  if (target.tagName !== 'path') {
    return;
  }

  const keyNumber = keys.indexOf(target.parentElement) + 1;
  const sound = new Audio(`./audio/key-${keyNumber}.mp3`);

  if (sound) {
    sound.play();
  }
});
