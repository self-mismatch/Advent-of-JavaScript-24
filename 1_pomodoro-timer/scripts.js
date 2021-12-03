'use strict';

const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1;

const ControlTextMap = {
  start: 'stop',
  stop: 'start',
};

const timerBlock = document.querySelector('.timer');
const minutesInput = timerBlock.querySelector('.minutes input');
const secondsInput = timerBlock.querySelector('.seconds input');
const mainControl = timerBlock.querySelector('.start');

let startTimerMinutes = minutesInput.value;
let startTimerSeconds = secondsInput.value;
let startTimerDurationInSeconds = Number(startTimerMinutes) * SECONDS_IN_MINUTE + Number(startTimerSeconds);
let currentTimerDurationInSeconds = startTimerDurationInSeconds;

const circle = document.querySelector('circle');
const circleRadius = circle.r.baseVal.value;
const circleCircumference = circleRadius * 2 * Math.PI;
circle.style.strokeDasharray = `${circleCircumference} ${circleCircumference}`;

let timer = null;

const settingsButton = timerBlock.querySelector('.settings');

const disableInputs = () => {
  minutesInput.disabled = true;
  secondsInput.disabled = true;
}

const toggleInputsDisable = () => {
  minutesInput.disabled = !minutesInput.disabled;
  secondsInput.disabled = !secondsInput.disabled;
};

const updateTimeFromInputs = () => {
  startTimerMinutes = minutesInput.value;
  startTimerSeconds = secondsInput.value;
  startTimerDurationInSeconds = Number(startTimerMinutes) * SECONDS_IN_MINUTE + Number(startTimerSeconds);
  currentTimerDurationInSeconds = startTimerDurationInSeconds;
};

const selectMinutes = () => {
  minutesInput.focus();
  minutesInput.setSelectionRange(0, minutesInput.value.length);
};

const settingsButtonClickHandler = () => {
  if (timer) {
    return;
  }

  toggleInputsDisable();

  if (!minutesInput.disabled) {
    selectMinutes();
  } else {
    updateTimeFromInputs();
  }
};

settingsButton.addEventListener('click', settingsButtonClickHandler);

const updateCircle = (percent) => {
  circle.style.strokeDashoffset = `${circleCircumference - percent * circleCircumference}`;
};

const resetCircle = () => {
  circle.style.strokeDashoffset = '0';
};

const resetTimer = () => {
  window.clearInterval(timer);
  timer = null;

  minutesInput.value = startTimerMinutes;
  secondsInput.value = startTimerSeconds;
  currentTimerDurationInSeconds = startTimerDurationInSeconds;

  resetCircle();
};

const stopTimer = (options = {isForceStopped: false}) => {
  const {isForceStopped} = options;
  changeControlButtonText();

  if (isForceStopped) {
    resetTimer({isForceStopped});
    return;
  }

  setTimeout(() => {
    alert('Timer is finished!');
    resetTimer();
  }, 0);
};

const updateTimer = () => {
  currentTimerDurationInSeconds -= 1;
  minutesInput.value = Math.floor(currentTimerDurationInSeconds / SECONDS_IN_MINUTE);
  secondsInput.value = currentTimerDurationInSeconds % SECONDS_IN_MINUTE;

  updateCircle(currentTimerDurationInSeconds / startTimerDurationInSeconds);

  if (currentTimerDurationInSeconds === 0) {
    stopTimer();
  }
};

const handleTimerAction = () => {
  if (timer) {
    stopTimer({isForceStopped: true});
    return;
  }

  disableInputs();
  updateTimeFromInputs();

  changeControlButtonText();

  timer = setInterval(updateTimer, MILLISECONDS_IN_SECOND);
};

const changeControlButtonText = () => {
  mainControl.textContent = ControlTextMap[mainControl.textContent];
};

const mainControlClickHandler = () => {
  handleTimerAction();
};

mainControl.addEventListener('click', mainControlClickHandler);
