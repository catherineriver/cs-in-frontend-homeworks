class HashMap {
    constructor(capacity) {
        this.capacity = capacity;
        this.size = 0;
        // место для элементов с одинаковыми хешами
        this.buckets = Array.from({ length: this.capacity }, () => []);
    }

    // Преобразует ключ в строку.
    // Вычисляет хеш-значение на основе символов строки.
    // Возвращает индекс в массиве buckets.
    hash(key) {
        let hash = 0;
        const keyString = key.toString();

        for (let i = 0; i < keyString.length; i++) {
            const char = keyString.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0; // Convert to 32bit integer
        }

        return Math.abs(hash) % this.capacity;
    }


    // Вычисляет индекс для ключа.
    // Проверяет, существует ли уже элемент с таким ключом в ведре.
    // Обновляет значение, если элемент существует.
    // Добавляет новый элемент, если его нет.
    // Увеличивает размер и, если необходимо, расширяет хеш-таблицу.
    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        const existing = bucket.find((item) => item[0] === key);

        if (existing) {
            existing[1] = value;
        } else {
            bucket.push([key, value]);
            this.size++;

            if (this.size > this.capacity * 0.75) {
                this.resize();
            }
        }
    }

    //     Вычисляет индекс для ключа.
    // Ищет элемент в ведре и возвращает его значение.
    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        const item = bucket.find((item) => item[0] === key);

        return item ? item[1] : undefined;
    }

    //     Вычисляет индекс для ключа.
    // Ищет элемент в ведре и возвращает true если он есть.
    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        const item = bucket.some((item) => item[0] === key);
        return item;
    }
    // Удаляет элемент с заданным ключом и возвращает его значение.
    delete(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        const itemIndex = bucket.findIndex((item) => item[0] === key);
        
        if (itemIndex !== -1) {
            const [[, value]] = bucket.splice(itemIndex, 1);
            this.size--;
            return value;
        }

        return undefined;
    }
}


const table = new HashMap(120);
const customObject = {};

table.set('foo', 1);
table.set(42, 10);
table.set(customObject, 10);

// console.log(table);
console.log(table.get(42));          // 10
console.log(table.has(customObject));    // true
console.log(table.delete(customObject)); // 10
console.log(table.has(customObject));    // false