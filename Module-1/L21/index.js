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

const randomInt = random(0, 100);
console.log(randomInt.next());
// console.log([...take(randomInt, 15)]);
console.log([...take(filter(randomInt, (el) => el > 200), 10)]);






