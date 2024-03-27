class BCD {
  private numbers: number[] = [];

  constructor(num: number) {
    // привести к строке, чтобы иметь доступ к каждой цифре
    let numberToString = num.toString();

    // Преобразую каждую цифры в BCD и сохраняю в массив numbers
    for (let i = 0; i < numberToString.length; i++) {
      // каждую цифру привести к десятичному числу
      let digit = parseInt(numberToString[i], 10);
      let binaryDigit = digit.toString(2).padStart(4, '0');

      // Сохраняю каждый бит BCD в массиве numbers
      for (let j = 0; j < binaryDigit.length; j++) {
        this.numbers.push(parseInt(binaryDigit[j]));
      }
    }
  }
  
  get(index: number): number {
    // Обработка отрицательных индексов
    if (index < 0) {
      index += this.numbers.length;
    }
    // Проверка на выход за границы массива
    if (index < 0 || index >= this.numbers.length) {
      throw new Error('Индекс находится за пределами массива.');
    }
    // Получение значения по индексу
    return this.numbers[index];
  }

  valueOf(): string {
    return this.numbers.join('');
  }
}

const n = new BCD(65536);

console.log(n);
console.log(n.valueOf());

console.log(n.get(0)); // 0
console.log(n.get(1)); // 1
console.log(n.get(2)); // 1
// и т.д.
