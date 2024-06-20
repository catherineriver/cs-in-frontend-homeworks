class Node {
    constructor(value) {
      this.value = value;
      this.prev = null;
      this.next = null;
    }
  }
  
  class LinkedList {
    constructor() {
      this.first = null;
      this.last = null;
    }
  
    add(value) {
      const newNode = new Node(value);
      if (!this.first) {
        this.first = newNode;
        this.last = newNode;
      } else {
        newNode.prev = this.last;
        this.last.next = newNode;
        this.last = newNode;
      }
    }
  
    *[Symbol.iterator]() {
      let current = this.first;
      while (current) {
        yield current.value;
        current = current.next;
      }
    }
  }
  
  // Пример использования
  
  const list = new LinkedList();
  
  list.add(1);
  list.add(2);
  list.add(3);
  
  console.log(list.first.value);           // 1
  console.log(list.last.value);            // 3
  console.log(list.first.next.value);      // 2
  console.log(list.first.next.prev.value); // 1
  