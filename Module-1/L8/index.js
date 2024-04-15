class Vector {
    constructor(data, options) {
          const { capacity } = options || {};
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
  }
  
  
  const vec = new Vector(Int32Array, {capacity: 4});
  
  vec.push(1); // Возвращает длину - 1
  vec.push(2); // 2
  vec.push(3); // 3
  vec.push(4); // 4
  vec.push(5); // 5 Увеличение буфера
  
  console.log(vec.capacity); // 8
  console.log(vec.length);   // 5
  
  vec.pop(); // Удаляет с конца, возвращает удаленный элемент - 5
  
  console.log(vec.capacity); // 8
  
  vec.shrinkToFit();         // Новая емкость 4
  console.log(vec.capacity); // 4
  
  console.log(vec.buffer);   // Ссылка на ArrayBuffer