

class Matrix {
    constructor(data, shape) {
      // check if size of data 
      
        this.data = data;
        this.shape = shape;
    }

    getMatrixSize(shape) {
      return shape.reduce((total, current) => total * current, 1);
    }

    get(indices) {
        if (indices.length !== this.shape.length) {
            throw new Error("Index dimension must match matrix dimension");
          }
    }

    set(indices, value) {
        if (indices.length !== this.shape.length) {
            throw new Error("Index dimension must match matrix dimension");
          }

          let index = 0;
        
          for (let i = 0; i < this.shape.length; i++) {
            index += indices[i] * this.shape[i];
          }
          this.data[index] = value;
    }    
}


const matrix2n2n2 = new Matrix(Int32Array, 2, 2, 2);

// matrix3n4n5.set(0(value), 0, 0, 1(position));

console.log(matrix2n2n2.getMatrixSize());

matrix2n2n2.set(0, 0, 0, 1);
matrix2n2n2.set(0, 1, 0, 2);
matrix2n2n2.set(0, 0, 1, 3);
matrix2n2n2.set(0, 1, 1, 4);

matrix2n2n2.set(1, 0, 0, 5);
matrix2n2n2.set(1, 1, 0, 6);
matrix2n2n2.set(1, 0, 1, 7);
matrix2n2n2.set(1, 1, 1, 8);

matrix2n2n2.get(0, 0, 0); // 1
matrix2n2n2.get(0, 1, 0); // 2
matrix2n2n2.get(0, 0, 1); // 3
matrix2n2n2.get(0, 1, 1); // 4

matrix2n2n2.get(1, 0, 0); // 5
matrix2n2n2.get(1, 1, 0); // 6
matrix2n2n2.get(1, 0, 1); // 7
matrix2n2n2.get(1, 1, 1); // 8

console.log(matrix2n2n2);  // Ссылка на ArrayBuffer