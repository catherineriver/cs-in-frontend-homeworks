class HashMap<Key, Value> {
    private data: Array<[Key, Value]>;
    private capacity: Number;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.data = []
    }

    private hashFunction(key: Key): any {


    }

    public set(key: Key, value: Value): void {
        const index = this.hashFunction(key);
        this.data[index] = [key, value];
    }

    public get(key: Key): void {
        console.log(key)
    }

    public has(key: Key): void {
        console.log(key)
    }

    public delete(key: Key): void {
        console.log(key)
    }
}


const map = new HashMap(120);

map.set('foo', 1);
map.set(42, 10);
map.set(document, 100);

console.log(map);
console.log(map.get(42));          // 10
console.log(map.has(document));    // true
console.log(map.delete(document)); // 10
console.log(map.has(document));    // false