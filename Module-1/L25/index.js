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
// const throttledLaugh = throttle(laugh, 5000);
// debouncedLaugh();
// debouncedLaugh();
// debouncedLaugh();
// debouncedLaugh();
// debouncedLaugh(); // Выполнится через 300 мс
// throttledLaugh(); // Выполнится сразу
// throttledLaugh();
// throttledLaugh();
// throttledLaugh();
// throttledLaugh(); // Выполнится через 300 мс

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push({ listener, once: false });
  }

  once(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push({ listener, once: true });
  }

  off(event, listener) {
    if (!this.events[event]) return;

    if (listener) {
      // Удаление конкретного обработчика
      this.events[event] = this.events[event].filter(
        handler => handler.listener !== listener
      );
    } else {
      delete this.events[event];
    }
  }

  emit(event, ...args) {
    if (!this.events[event]) return;
    const handlers = [...this.events[event]];

    handlers.forEach(({ listener, once }) => {
      listener(...args);
      if (once) {
        this.off(event, listener);
      }
    });
  }

}

// const ee = new EventEmitter();

// ee.once('foo', console.log); // Сработает только один раз

// ee.emit('foo', 1);
// ee.emit('foo', 2);

// ee.off('foo', console.log); // Отмена конкретного обработчика события по ссылке
// ee.off('foo');              // Отмена всех обработчиков этого события

function waterfall(tasks, finalCallback) {
  // Если tasks не является массивом, преобразуем его в массив
  if (!(tasks instanceof Array)) {
    tasks = Array.from(tasks);
  }

  // Проверка на пустоту массива
  if (tasks.length === 0) {
    return finalCallback(null);
  }

  let index = 0;

  // Внутренняя функция для выполнения задач
  function runTask(err, ...results) {
    if (err || index === tasks.length) {
      return finalCallback(err, ...results);
    }

    // Получаем текущую задачу и увеличиваем индекс
    const task = tasks[index++];
    try {
      // Вызываем текущую задачу с передачей результатов предыдущих задач
      task(...results, runTask);
    } catch (e) {
      // В случае ошибки, вызываем finalCallback с ошибкой
      finalCallback(e);
    }
  }

  // Начинаем выполнение задач с нулевого индекса
  runTask();
}

waterfall([
  (cb) => {
    cb(null, 'one', 'two');
  },

  (arg1, arg2, cb) => {
    console.log(arg1); // one
    console.log(arg2); // two
    cb(null, 'three');
  },

  (arg1, cb) => {
    console.log(arg1); // three
    cb(null, 'done');
  }
], (err, result) => {
  console.log(result); // done
});

waterfall(new Set([
  (cb) => {
    cb('ha-ha!');
  },

  (arg1, cb) => {
    cb(null, 'done');
  }
]), (err, result) => {
  console.log(err);    // ha-ha!
  console.log(result); // undefined
});