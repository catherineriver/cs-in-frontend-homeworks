class BCD {
  private numbers: number[] = [];

  constructor(num: number) {
    // привести к строке, чтобы иметь доступ к каждому числу
    let numberToString = num.toString();
    let BCDNumber = '';

    for (let i = 0; i < numberToString.length; i++) {
      // каждую цифру привести к десятичному числу
      let digit = parseInt(numberToString[i], 10);
      let binaryDigit = digit.toString(2).padStart(4, '0');
      BCDNumber += binaryDigit;
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
}

const n = new BCD(65536);

console.log(n); // 0b01100101010100110110 или 415030

console.log(n.get(0)); // 6
console.log(n.get(1)); // 3

console.log(n.get(-1)); // 6
console.log(n.get(-2)); // 5
