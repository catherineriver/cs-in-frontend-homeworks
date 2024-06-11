// Создаем структуру узла, содержащую типизированный массив данных и ссылки на предыдущий и следующий узлы.
class Node {
    constructor(data) {
        this.data = new Uint8Array(data);
        this.first = 0; // индекс начала
        this.last = 0; // индекс конца
        this.next = null;
        this.prev = null;
    }

    pushLeft(value) {
        if (this.start === 0) {
            throw new Error("No space on the left");
        }
        this.data[--this.start] = value;
    }
}

class Dequeue {
    constructor(arrayType, capacity) {
        this.arrayType = arrayType;
        this.capacity = capacity;
        // capacity используется для задания максимальной емкости типизированного массива в каждом узле Node
        // Это нужно, чтобы каждый узел мог содержать ограниченное количество элементов, и мы могли динамически создавать новые узлы, когда один узел становится полным.
        this.head = new Node(arrayType, capacity); // head очереди
        this.tail = null; // tail очереди
        this.size = 0;
    }

    get length() {
        return this.size;
    }

    pushLeft(element) {
        // Проверка на заполненность текущего узла слева:
        if (this.head.start === 0 ) {
            // создали новый узел
            const newNode = new Node(this.arrayType, this.capacity);
            // Новый узел newNode становится новым head очереди.
            // Устанавливаем ссылку next нового узла на текущий head.
            newNode.next = this.head;
            // Устанавливаем ссылку prev текущего head на новый узел.
            this.head.prev = newNode;
            // Обновляем head, чтобы указать на новый узел.
            this.head = newNode;
        }
        // Добавляем элемент в head:
        this.head.pushLeft(element);
        // Увеличиваем размер очереди
        this.size++;
        console.log(this.size)
        return this.size;
    }
}

const dequeue = new Dequeue(Uint8Array, 64);

dequeue.pushLeft(1); // Возвращает длину - 1
dequeue.pushLeft(2); // 2
dequeue.pushLeft(3); // 3