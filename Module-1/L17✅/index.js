// Бор (Trie) — это древовидная структура данных, которая используется для хранения множества строк, 
// например, слов в словаре. В борах каждый узел представляет собой отдельный символ. 
// Строки хранятся таким образом, что общие префиксы строк разделяют общие пути в дереве.

class TrieNode {
    constructor(value = '') {
      this.value = value;
      this.children = {}; 
      this.terminalPoint = false; 
    }
  }

class Trie {
  constructor() {
      this.root = new TrieNode();  // корневой узел
      this.currentNode = this.root;  // стартовая позиция текущего узла
  }
    // Добавление слова "мясо":
    // Начинаем с корня.
    // Проверяем символ 'м':
    // Если дочерний узел для 'м' не существует, создаем его.
    // Переходим к узлу 'м'.
    // Проверяем символ 'я':
    // Если дочерний узел для 'я' не существует, создаем его.
    // Переходим к узлу 'я'.
    // Проверяем символ 'с':
    // Если дочерний узел для 'с' не существует, создаем его.
    // Переходим к узлу 'с'.
    // Проверяем символ 'о':
    // Если дочерний узел для 'о' не существует, создаем его.
    // Переходим к узлу 'о'.
    // Устанавливаем terminalPoint = true для узла 'о'.
  addWord(word) {
      let currentNode = this.root;

      for (const char of word) {
          if (!currentNode.children[char]) {
              currentNode.children[char] = new TrieNode(char);
          }

          currentNode = currentNode.children[char];
      }

      currentNode.terminalPoint = true;
  }

  go(char) {
      if (this.currentNode.children[char]) {  // Проверим, есть ли дочерний узел
          this.currentNode = this.currentNode.children[char];  // Перейдем к нему
          return this;  // Вернем текущий объект для цепочечного вызова
        } else {
          throw new Error(`Character '${char}' not found`);  // Выбросим ошибку, если узла нет
        }
  }

  isWord() {
      return this.currentNode.terminalPoint;  // Проверим, является ли текущий узел концом слова
    }
}

const trie = new Trie();

function patternToRegexp(pattern) {
  // Разделяем шаблон на части по разделителю 
  const parts = pattern.split('.');
  // Преобразуем части шаблона в регулярное выражение:
  const regexParts = parts.map(part => {
    if (part === '**') {
      return '.*'; // Любой набор символов до конца строки
    } else if (part === '*') {
      return '[^/]*'; // Любой набор символов до следующего разделителя
    } else {
      return part; // Обычная часть шаблона
    }
  });
  return new RegExp(`^${regexParts.join('.')}$`);
}

function match(pattern, strings) {
  const regex = patternToRegexp(pattern);
  return strings.filter(string => regex.test(string));
}

trie.addWord('мясо');
trie.addWord('мясорубка');
trie.addWord('мир');

console.log(trie.go('м').go('я').go('с').go('о').isWord()); // true
console.log(match('foo.*.bar.**', ['foo', 'foo.bla.bar.baz', 'foo.bag.bar.ban.bla', 'bag.foo.bar', 'foo.foo.bar.sss'])); // ['foo.bla.bar.baz', 'foo.bag.bar.ban.bla']
