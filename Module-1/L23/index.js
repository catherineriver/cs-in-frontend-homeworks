// ## Необходимо КА, который считывает дробные числа из потока входных данных
// Если поток данных иссяк, то КА должен выбрасывать исключение и переходить в состояние ожидания новых данных.

const someString = "12.3 abc -4.5 def 6.7 string 1.0 22.1 hasda 0986";
const newString = "8.9 ghi 10.11 jkl";
const numbers = getNumbers(someString);

try {
  for (const number of numbers) {
    console.log(number);
  }
  
} catch (e) {
  console.log(e);
  numbers.next(newString);
}

function* getNumbers(input) {
  const state = {
    READING: 'reading',
    WAITING_FOR_INPUT: 'waiting'
  };

  let currentState = state.READING;
  const regexp = /-?\d+\.\d+/g;
  let arr = input.match(regexp);
  

  while (true) {
    if (currentState === state.READING) {
      if (arr.length === 0) {
        currentState = state.WAITING_FOR_INPUT;
      } else {
        for (const item of arr) {
          yield item;
        }
        arr = []; // ждем новые данные
      }
    }
    
    if (currentState === state.WAITING_FOR_INPUT) {
      arr = yield new Error("Data stream exhausted. Expecting new input.");
      if (arr === undefined) return;
      
      arr = arr.match(/-?\d+\.\d+/g); // Обновляем массив с новыми данными
      currentState = state.READING; 
    }
  }
}