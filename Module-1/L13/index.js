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

    // Проверить, существует ли ребро или дуга между узлами node1 и node2.
    checkAdjacency(node1, node2) {
        return this.matrix.getValue(node1, node2) !== 0;
    }

    createEdge(node1, node2, weight = 1) {
        // Этот вызов метода setValue устанавливает вес ребра от node1 к node2 в матрице смежности.
        // WTF is вес ребра? 
        // Вес — это стоимость использования данного ребра.
        this.matrix.setValue(node1, node2, weight);
        this.matrix.setValue(node2, node1, weight);
    }

    removeEdge(node1, node2) {
        // чтобы удалить, меняем вес на 0
        this.matrix.setValue(node1, node2, 0);
        this.matrix.setValue(node2, node1, 0);
    }

    createArc(node1, node2, weight = 1) {
        this.matrix.setValue(node1, node2, weight);
    }

    removeArc(node1, node2) {
        // чтобы удалить, меняем вес на 0
        this.matrix.setValue(node1, node2, 0);
    }

    // А в чем разница между edge и arc?
    // Ребро (Edge)
    // Ребро (иногда также называют гранью) — это соединение между двумя узлами (вершинами) в неориентированном графе. Ребра не имеют направления.
    // Между А и B можно перемещаться в обе стороны

    // Дуга (Arc)
    // Дуга — это направленное соединение между двумя узлами в ориентированном графе. Дуги имеют направление, указывающее от одного узла к другому.
    // Между А и B можно перемещаться в одну сторону
}


const adjacencyMatrix = new Matrix(Uint8Array, 10, 10);
const graph = new Graph(adjacencyMatrix);
graph.checkAdjacency(1, 2)
graph.createEdge(7, 2, 10);
graph.removeEdge(7, 2);
graph.createArc(7, 2, 6);
graph.removeArc(7, 2);

console.log(adjacencyMatrix)
