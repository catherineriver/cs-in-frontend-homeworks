// Необходимо написать итератор для генерации случайных чисел по заданным параметрам
function* random(min, max) {
    while (true) {  // Бесконечный цикл
        yield Math.floor(Math.random() * (max - min)) + min;  // Генерация случайного числа
    }
}

// Необходимо написать функцию take, которая принимает любой Iterable объект и возвращает итератор по заданному количеству его элементов
function* take(iterable, count) {
    let i = 0;
    // Используем цикл for...of для обхода элементов итерируемого объекта.
    for (const item of iterable) {
        // Проверяем, достигло ли количество возвращенных элементов заданного count. Если да, то завершаем генератор с помощью return.
      if (i >= count) {
        return;
      }
      yield item;
      i++;
    }
  }

// Необходимо написать функцию filter, которая принимает любой Iterable объект и функцию-предикат. И возвращает итератор по элементам которые удовлетворяют предикату.
function* filter(iterable, predicate) {
  for (const item of iterable) {
    if (predicate(item)) {
      yield item;
    }
  }
}

// ## Необходимо написать функцию enumerate, которая принимает любой Iterable объект и возвращает итератор по парам (номер итерации, элемент)
function* enumerate(iterable) {
  let iterationIndex = 0;
  for (const item of iterable) {
    yield [iterationIndex, item];
    iterationIndex++;
  }
}

// ## Необходимо написать класс Range, который бы позволял создавать диапазоны чисел или символов, а также позволял обходить элементы Range с любого конца
class Range {
    constructor(start, end) {
      this.start = start;
      this.end = end;
  }

  *[Symbol.iterator]() {
    const isNumbers = typeof this.start === 'number' && typeof this.end === 'number';
    const isStrings = typeof this.start === 'string' && typeof this.end === 'string';
    if (isNumbers) {
      // для i от start до end включительно
      for (let i = this.start; i <= this.end; i++) {
        yield i;
      }
    } else if (isStrings) {
      // для i от ASCII кода start до ASCII кода end включительно
      for (let i = this.start.charCodeAt(0); i <= this.end.charCodeAt(0); i++) {
        yield String.fromCharCode(i);
    }
    }
  }

  *reverse() {
    const isNumbers = typeof this.start === 'number' && typeof this.end === 'number';
    const isStrings = typeof this.start === 'string' && typeof this.end === 'string';

    if (isNumbers) {
      for (let i = this.end; i>= this.start; i--) {
        yield i;
      }
    } else if (isStrings) {
      for (let i = this.end.charCodeAt(0); i <= this.start.charCodeAt(0); i--) {
        yield String.fromCharCode(i);
    }
    }
  }
}

// ## Необходимо написать функцию seq, которая бы принимала множество Iterable объектов и возвращала итератор по их элементам
function* seq(...objects) {
    for (const object of objects) {
      for (const item of object) {
        yield item;
      }
    }
}

// Необходимо написать функцию zip, которая бы принимала множество Iterable объектов и возвращала итератор по кортежам их элементов
function* zip(...iterables) {
  const iterators = iterables.map(it => it[Symbol.iterator]());
  // const iterators = [
  //   [1, 2][Symbol.iterator](),  // Итератор для массива [1, 2]
  //   new Set([3, 4])[Symbol.iterator](),  // Итератор для множества Set([3, 4])
  //   'bl'[Symbol.iterator]()  // Итератор для строки 'bl'
  // ];

  while (true) {
    const results = iterators.map(it => it.next());
    if (results.some(res => res.done)) {
      break;
    }
    yield results.map(res => res.value);
  }

  // Первая итерация:
    // iterators.map(it => it.next()) возвращает:
    // [
    //   { value: 1, done: false },  // Первый элемент из массива [1, 2]
    //   { value: 3, done: false },  // Первый элемент из множества Set([3, 4])
    //   { value: 'b', done: false }  // Первый элемент из строки 'bl'
    // ]
    // Проверка results.some(res => res.done) вернет false, так как ни один итератор не достиг конца.
    // results.map(res => res.value) вернет [1, 3, 'b'], который будет возвращен с помощью yield.

    //     Вторая итерация:
    // iterators.map(it => it.next()) возвращает:
    // [
    //   { value: 2, done: false },  // Второй элемент из массива [1, 2]
    //   { value: 4, done: false },  // Второй элемент из множества Set([3, 4])
    //   { value: 'l', done: false }  // Второй элемент из строки 'bl'
    // ]
    // Проверка results.some(res => res.done) вернет false.
    // results.map(res => res.value) вернет [2, 4, 'l'].

    // Третья итерация:

    // iterators.map(it => it.next()) возвращает:
    // [
    //   { value: undefined, done: true },  // Конец итерации для массива [1, 2]
    //   { value: undefined, done: true },  // Конец итерации для множества Set([3, 4])
    //   { value: undefined, done: true }  // Конец итерации для строки 'bl'
    // ]
    // Проверка results.some(res => res.done) вернет true, и цикл прервется.
}

// Необходимо написать функцию, которая принимала бы любой Iterable объект и Iterable с функциями и возвращала итератор где каждому элементу левого Iterable последовательно применяются все функции из правого
function* mapSeq(...iterables, iterator) {
  

}

const randomInt = random(0, 1000);
// console.log(randomInt.next());
// console.log([...take(randomInt, 15)]);
// console.log([...take(filter(randomInt, (el) => el < 87), 10)]);
// console.log([...take(enumerate(randomInt), 2)]); // [[0, ...], [1, ...], [2, ...]]
// const symbolRange = new Range('a', 'f');
// console.log(Array.from(symbolRange)); // ['a', 'b', 'c', 'd', 'e', 'f']
// const numberRange = new Range(-5, 1);
// console.log(Array.from(numberRange.reverse())); // [1, 0, -1, -2, -3, -4, -5]
// console.log(...seq([1, 2], new Set([3, 4]), 'bla')); // 1, 2, 3, 4, 'b', 'l', 'a'
// console.log(...zip([1, 2], new Set([3, 4]), 'bl')); // [[1, 3, b], [2, 4, 'l']]

console.log(...mapSeq([1, 2, 3], [(el) => el * 2, (el) => el - 1])); // [1, 3, 5]






