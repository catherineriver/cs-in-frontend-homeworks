function* fizzbuzz() {
    let i = 1n;
    while (true) {
      if (i % 3n === 0n && i % 5n === 0n) {
        yield 'FizzBuzz';
      } else if (i % 3n === 0n) {
        yield 'Fizz';
      } else if (i % 5n === 0n) {
        yield 'Buzz';
      } else {
        yield i;
      }
      i++;
    }
  }
  
  const myFizzBazz = fizzbuzz();
  
  console.log(
    myFizzBazz.next(), 
    myFizzBazz.next(), 
    myFizzBazz.next(), 
    myFizzBazz.next(), 
    myFizzBazz.next(), 
    myFizzBazz.next()
)
  