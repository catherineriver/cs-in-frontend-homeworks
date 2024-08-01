// ## Написать функцию debounce
function debounce(func, delay) {
    let timeoutId;
  
    return function(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

// ## Написать функцию throttle
function throttle(func, timeout) {
    let timer = null;
    let lastCall = 0;
  
    return function perform(...args) {
      const now = Date.now();
      const remaining = timeout - (now - lastCall);
  
      if (remaining <= 0) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        func(...args);
        lastCall = now;
      } else if (!timer) {
        timer = setTimeout(() => {
          func(...args);
          lastCall = Date.now();
          timer = null;
        }, remaining);
      }
    };
  }

function laugh() {
  console.log('Ha-ha-ha!')
}

// const debouncedLaugh = debounce(laugh, 5000);
const throttledLaugh = throttle(laugh, 5000);
// debouncedLaugh();
// debouncedLaugh();
// debouncedLaugh();
// debouncedLaugh();
// debouncedLaugh(); // Выполнится через 300 мс
throttledLaugh(); // Выполнится сразу
throttledLaugh();
throttledLaugh();
throttledLaugh();
throttledLaugh(); // Выполнится через 300 мс