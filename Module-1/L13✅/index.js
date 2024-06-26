// Реализовать класс для представления графа с помощью матрицы смежности

class Matrix {
    constructor(arrayType, rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = new arrayType(rows * cols);
    }
    // так как используется одномерный типизированный массив, 
    // нужно  преобразовать двумерные координаты (строка и столбец) в одномерный индекс
    // чтобы правильно получить доступ к элементам матрицы
    // Представьте матрицу, состоящую из строк и столбцов. Например, для 3x3 матрицы:
    // [0,0] [0,1] [0,2]
    // [1,0] [1,1] [1,2]
    // [2,0] [2,1] [2,2]
    // В одномерном массиве эти же элементы будут храниться так:
    // [0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0], [2,1], [2,2]
    // Для получения индекса элемента в одномерном массиве используется формула:
    // index = row × cols + col
    // Например, для элемента [1,2] в матрице:
    // index = 1 × 3 + 2 = 5
    // Таким образом, элемент [1,2] соответствует пятому элементу в одномерном массиве.

    setValue(row, col, value) {
        const index = row * this.cols + col;
        this.data[index] = value;
    }

    getValue(row, col) {
        const index = row * this.cols + col;
        return this.data[index];
    }
}

class Graph {
    constructor(matrix) {
      this.matrix = matrix;
    }
  
    checkAdjacency(node1, node2) {
      return this.matrix.getValue(node1, node2) !== 0;
    }
  
    createEdge(node1, node2, weight = 1) {
      this.matrix.setValue(node1, node2, weight);
      this.matrix.setValue(node2, node1, weight);
    }
  
    removeEdge(node1, node2) {
      this.matrix.setValue(node1, node2, 0);
      this.matrix.setValue(node2, node1, 0);
    }
  
    createArc(node1, node2, weight = 1) {
      this.matrix.setValue(node1, node2, weight);
    }
  
    removeArc(node1, node2) {
      this.matrix.setValue(node1, node2, 0);
    }
  
    getEdgeWeight(node1, node2) {
      return this.matrix.getValue(node1, node2);
    }
  
    traverseBFS(startNode, callback) {
      const visited = new Array(this.matrix.rows).fill(false);
      const queue = [startNode];
      const result = [];
  
      visited[startNode] = true;
  
      while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
  
        if (callback) {
          callback(node);
        }
  
        for (let i = 0; i < this.matrix.cols; i++) {
          if (this.checkAdjacency(node, i) && !visited[i]) {
            queue.push(i);
            visited[i] = true;
          }
        }
      }
  
      return result;
    }
  }
  
  
  

const adjacencyMatrix = new Matrix(Uint8Array, 10, 10);
const graph = new Graph(adjacencyMatrix);

graph.createEdge(0, 1, 5);
graph.createEdge(0, 2, 3);
graph.createEdge(1, 2, 2);
graph.createEdge(1, 3, 4);
graph.createEdge(2, 4, 1);
graph.createEdge(3, 4, 7);
graph.createEdge(3, 5, 6);
graph.createEdge(4, 6, 8);

graph.createArc(5, 7, 9);
graph.createArc(6, 8, 4);
graph.createArc(7, 9, 3);
graph.createArc(8, 9, 2);
graph.createArc(9, 5, 1);


graph.traverseBFS(7, (node) => {
    console.log(`Посещен узел: ${node}`);

    for (let i = 0; i < adjacencyMatrix.cols; i++) {
        if (graph.checkAdjacency(node, i)) {
          console.log(`Вес ребра между ${node} и ${i}: ${graph.getEdgeWeight(node, i)}`);
        }
      }

  });

console.log(adjacencyMatrix.data)
