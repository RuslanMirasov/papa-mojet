export const initCountdown = date => {
  if (!date) return;

  const daysEl = document.querySelector('[data-days]');
  const hoursEl = document.querySelector('[data-hours]');
  const minutesEl = document.querySelector('[data-minutes]');
  const secondsEl = document.querySelector('[data-seconds]');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
    console.warn('Не удалось найти один из елементов разметки счётчика! (data-days | data-hours | data-minutes | data-seconds)');
    return;
  }

  const MONTHS = {
    января: 0,
    февраля: 1,
    марта: 2,
    апреля: 3,
    мая: 4,
    июня: 5,
    июля: 6,
    августа: 7,
    сентября: 8,
    октября: 9,
    ноября: 10,
    декабря: 11,
  };

  const m = String(date)
    .trim()
    .toLowerCase()
    .match(/^(\d{1,2})\s+([а-яё]+)\s+(\d{4})$/i);
  if (!m || !(m[2] in MONTHS)) {
    console.warn('Неверный формат даты! Введите например: "13 января 2025"');
    return;
  }

  const day = parseInt(m[1], 10);
  const month = MONTHS[m[2]];
  const year = parseInt(m[3], 10);

  const target = new Date(year, month, day, 0, 0, 0, 0);

  function pad2(n) {
    return String(n).padStart(2, '0');
  }

  let timerId;

  function tick() {
    const now = new Date();
    let diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      clearInterval(timerId);
      return;
    }

    const sec = Math.floor(diff / 1000);
    const days = Math.floor(sec / 86400);
    const hours = Math.floor((sec % 86400) / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;

    daysEl.textContent = pad2(days);
    hoursEl.textContent = pad2(hours);
    minutesEl.textContent = pad2(minutes);
    secondsEl.textContent = pad2(seconds);
  }

  tick();
  timerId = setInterval(tick, 1000);

  return () => clearInterval(timerId);
};
