// Создаем структуру узла, содержащую типизированный массив данных и ссылки на предыдущий и следующий узлы.
class Node {
    constructor(arrayType, capacity) {
        this.data = new arrayType(capacity);
        this.first = capacity; // Начать с конца массива, чтобы иметь место для pushLeft
        this.last = 0; // Начать с начала массива для pushRight
        this.next = null;
        this.prev = null;
    }

    isFull() {
        return this.first === 0 && this.last === this.data.length;
    }

    isEmpty() {
        return this.first === this.data.length && this.last === 0;
    }

    pushLeft(value) {
        if (this.first === 0) {
            throw new Error("No space on the left");
        }
        this.data[--this.first] = value;
    }

    pushRight(value) {
        if (this.last === this.data.length) {
            throw new Error('No space on the right');
        }
        this.data[this.last++] = value;
    }

    popLeft() {
        if (this.isEmpty()) {
            throw new Error("No elements to pop from the left");
        }

        // индекс первого элемента перемещается на следующий индекс
        return this.data[this.first++];
    }

    popRight() {
        if (this.isEmpty()) {
            throw new Error("No elements to pop from the right");
        }
        return this.data[--this.last];
    }
}

class Dequeue {
    constructor(arrayType, capacity) {
        this.arrayType = arrayType;
        this.capacity = capacity;
        // capacity используется для задания максимальной емкости типизированного массива в каждом узле Node
        // Это нужно, чтобы каждый узел мог содержать ограниченное количество элементов, и мы могли динамически создавать новые узлы, когда один узел становится полным.
        this.head = new Node(arrayType, capacity); // head очереди
        this.tail = new Node(arrayType, capacity); // tail очереди
        this.size = 0;
    }

    get length() {
        return this.size;
    }

    pushLeft(element) {
        // Проверка на заполненность текущего узла слева:
        if (this.head.first === 0 ) {
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

        return this.size;
    }

    //Когда мы вызываем pushRight(40):

    // Проверка наличия места справа:

    // end не равен длине массива data (5), значит, место есть.
    // Добавление значения справа:

    // Значение 40 добавляется в массив data по индексу 3.
    // end увеличивается на 1, теперь end равен 4.
    pushRight(element) {
        // Проверка на заполненность текущего узла справа:
        // Если last равен capacity, это означает, что в текущем узле tail больше нет свободного места справа для добавления нового элемента.
        if (this.tail.last === this.capacity ) {
            const newNode = new Node(this.arrayType, this.capacity)
            newNode.prev = this.tail;
            this.tail.prev = newNode;
            this.tail = newNode;
        }
        // Добавление значения справа в текущий узел:
        this.tail.pushRight(element);
        this.size++;
        return this.size;
    }

    popLeft() {
        // проверить есть элементы в очереди
        if (this.size === 0) {
            throw new Error("Deque is empty");
        }
        // Вызывает метод popLeft текущего узла head, чтобы удалить и вернуть значение из начала узла.
        const value = this.head.popLeft();
        // Проверяет, пуст ли текущий узел head после удаления элемента.
        // Если узел пуст и у него есть следующий узел (next), обновляет указатель head на следующий узел.
        // Удаляет обратную ссылку на предыдущий узел, устанавливая prev нового head в null.
        if (this.head.first === this.head.data.length && this.head.next !== null) {
            this.head = this.head.next;
            this.head.prev = null;
        }
        this.size--;
        return value;
    }

    popRight() {
         // проверить есть элементы в очереди
         if (this.size === 0) {
            throw new Error("Deque is empty");
        }

        const value = this.tail.popRight();
        // Проверяет, пуст ли текущий узел tail после удаления элемента.
        // Если узел пуст и у него есть предыдущий узел (prev), обновляет указатель tail на предыдущий узел.
        // Удаляет обратную ссылку на следующий узел, устанавливая next нового tail в null.
        if (this.tail.isEmpty() && this.tail.prev !== null) {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }

        this.size--;
        return value;
    }
}

const dequeue = new Dequeue(Uint8Array, 64);

console.log('pushRight', dequeue.pushLeft(1)); // Возвращает длину - 1
console.log('pushRight', dequeue.pushLeft(2)); // Возвращает длину - 2
console.log('pushRight', dequeue.pushLeft(3)); // Возвращает длину - 3

console.log('length', dequeue.length); // 3
console.log('popLeft', dequeue.popLeft()); // Удаляет с начала, возвращает удаленный элемент - 3

console.log('pushRight', dequeue.pushRight(4)); // Возвращает длину - 3
console.log('pushRight', dequeue.pushRight(5)); // Возвращает длину - 4
console.log('pushRight', dequeue.pushRight(6)); // Возвращает длину - 5

console.log('popRight', dequeue.popRight());         // Удаляет с конца, возвращает удаленный элемент - 6