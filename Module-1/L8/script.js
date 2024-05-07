class VectorIterator {
  constructor(vector) {
    this.vector = vector;
    this.currentIndex = 0;
    this.done = false; // iteration finished
  }

  next() {
    if (this.currentIndex < this.vector.length) {
      return {
        done: false,
        value: this.vector[this.currentIndex++]
      };
    } else {
      this.done = true;
      return {
        done: true
      };
    }
  }
}

class Vector {
  constructor(data, options) {
    const {
      capacity
    } = options || {};
    this.capacity = capacity;
    this.length = 0;
    // all store here
    this.buffer = new data();
  }

  push(value) {
    // add capacity if buffer full
    if (this.length === this.capacity) {
      this.capacity *= 2;
      const newBuffer = new this.buffer.constructor(this.capacity);
      newBuffer.set(this.buffer);
      this.buffer = newBuffer;
    }
    this.buffer[this.length++] = value;
    return this.length;
  }

  pop() {
    if (this.length === 0) {
      return undefined;
    }
    // remove last element from end
    const value = this.buffer[--this.length];
    return value;
  }

  shrinkToFit() {
    this.capacity = this.length;

    const newBuffer = new this.buffer.constructor(this.capacity);
    newBuffer.set(this.buffer.subarray(0, this.length));
    this.buffer = newBuffer;
  }

  values() {
    return new VectorIterator(this.buffer);
  }
}

const vec = new Vector(Int32Array, {
  capacity: 1
});
const i = vec.values();

vec.push(1); // Возвращает длину - 1
vec.push(2); // 2
vec.push(3); // 

console.log(i.next()); // {done: false, value: 1}
console.log(i.next()); // {done: false, value: 2}
console.log(i.next()); // {done: false, value: 3}
console.log(i.next()); // {done: true, value: undefined}

console.log('capacity', vec.capacity); // 8
console.log('length', vec.length); // 5
console.log('Ссылка на ArrayBuffer', vec.buffer[0]); // Ссылка на ArrayBuffer
