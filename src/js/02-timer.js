// Описаний в документації
import flatpickr from 'flatpickr';
flatpickr("#myID", {});
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  input: document.querySelector('#datetime-picker'),
};

refs.start.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > options.defaultDate.getTime()) {
      console.log(selectedDates[0]);
      refs.start.disabled = false;
    } else {
      refs.start.disabled = true;
      Notify.failure('Please choose a date in the future');
    }
  },
};
flatpickr('#datetime-picker', options);

refs.start.addEventListener('click', onStartTimer);
function onStartTimer() {
  const timerId = setInterval(() => {
    const currentDate = new Date();
    const timeDifr =
      refs.input._flatpickr.selectedDates[0].getTime() - currentDate.getTime();
    const timerObj = convertMs(timeDifr);
    if (timeDifr >= 0) {
      refs.days.textContent = addLeadingZero(`${timerObj.days}`);
      refs.hours.textContent = addLeadingZero(`${timerObj.hours}`);
      refs.minutes.textContent = addLeadingZero(`${timerObj.minutes}`);
      refs.seconds.textContent = addLeadingZero(`${timerObj.seconds}`);
    } else {
      refs.days.textContent = '00';
      refs.hours.textContent = '00';
      refs.minutes.textContent = '00';
      refs.seconds.textContent = '00';
    }
  });
  refs.input.addEventListener('click', () => {
    clearInterval(timerId);
  });
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, 0);
}