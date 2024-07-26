// ## Необходимо КА, который считывает дробные числа из потока входных данных
// Если поток данных иссяк, то КА должен выбрасывать исключение и переходить в состояние ожидания новых данных.

const someString = "12.3 abc -4.5 def 6.7 string 1.0 22.1 hasda 0986";
const newString = "8.9 ghi 10.11 jkl";
const numbers = getNumbers(someString);

try {
  console.log(...numbers);

} catch (e) {
  console.log(e);
  numbers.next(newString);
}

function splitString(input) {
  return input.split(/\s+/);
}

function* getNumbers(input) {
  let data = input;
  const regexp = /-?\d+\.\d+/g;

  while (true) {
    const arr = data.match(regexp) || [];
    let found = false;

    for (const item of arr) {
      yield item;
      found = true;
    }

    if (!found) {
      try {
        data = yield new Error("Data stream exhausted. Expecting new input.");
      } catch (e) {
        return;
      }
    } else {
      data = '';
    }
  }
}