// Написать функции indexOf и lastIndexOf используя бинарный поиск
const sortingArr = (array) => {
    return array.sort((a, b) => a - b);
}


const indexOf = (array, compare) => {
    let start = 0;
    let end = array.length - 1;
    let result = -1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);
        const comparison = compare(array[middle]);

        if (comparison === 0) {
            result = middle;
            end = middle - 1; // Ищем первое вхождение, двигаемся влево
        } else if (comparison < 0) {
            start = middle + 1; // Ищем справа
        } else {
            end = middle - 1; // Ищем слева
        }
    }

    return result;
};

const lastIndexOf = (array, compare) => {
    let start = 0;
    let end = array.length - 1;
    let result = -1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);
        const comparison = compare(array[middle]);

        if (comparison === 0) {
            result = middle;
            start = middle + 1; // Ищем последнее вхождение, двигаемся вправо
        } else if (comparison < 0) {
            start = middle + 1; // Ищем справа
        } else {
            end = middle - 1; // Ищем слева
        }
    }

    return result;
}


const arr = [{age: 12, name: 'Bob'}, {age: 42, name: 'Ben'}, {age: 42, name: 'Jack'}, {age: 42, name: 'Sam'}, {age: 56, name: 'Bill'}];
const sortedArray = sortingArr(arr);

console.log(sortedArray);
console.log(indexOf(sortedArray, ({age}) => age - 42)); // 1
console.log(lastIndexOf(sortedArray, ({age}) => age - 42)); // 3
console.log(lastIndexOf(sortedArray, ({age}) => age - 82)); // -1;