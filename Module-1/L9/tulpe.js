class Structure {
  constructor(schema) {
      this.schema = schema;
      this.size = this.computeSize();
  }

  static U8 = {
      size: 1,
      write: (view, offset, value) => view.setUint8(offset, value),
      read: (view, offset) => view.getUint8(offset)
  };

  static U7 = {
      size: 1,
      write: (view, offset, value) => view.setUint8(offset, value & 0x7F),
      read: (view, offset) => view.getUint8(offset) & 0x7F
  };

  static String = (length) => ({
      size: length,
      write: (view, offset, value) => {
          for (let i = 0; i < length; i++) {
              view.setUint8(offset + i, value.charCodeAt(i) || 0);
          }
      },
      read: (view, offset) => {
          let result = '';
          for (let i = 0; i < length; i++) {
              result += String.fromCharCode(view.getUint8(offset + i));
          }
          return result.trim();
      }
  });

  static Tuple = (...types) => ({
      size: types.reduce((acc, type) => acc + type.size, 0),
      write: (view, offset, values) => {
          let currentOffset = offset;
          types.forEach((type, index) => {
              type.write(view, currentOffset, values[index]);
              currentOffset += type.size;
          });
      },
      read: (view, offset) => {
          let currentOffset = offset;
          return types.map(type => {
              const value = type.read(view, currentOffset);
              currentOffset += type.size;
              return value;
          });
      }
  });

  computeSize() {
      return Object.values(this.schema).reduce((acc, type) => acc + type.size, 0);
  }

  create(data) {
      const buffer = new ArrayBuffer(this.size);
      const view = new DataView(buffer);
      let offset = 0;

      for (const [key, type] of Object.entries(this.schema)) {
          if (type.write) {
              type.write(view, offset, data[key]);
              offset += type.size;
          } else if (type instanceof Structure) {
              const nested = type.create(data[key]);
              new Uint8Array(buffer, offset, type.size).set(new Uint8Array(nested.buffer));
              offset += type.size;
          } else if (Array.isArray(type) && type[0].write) {
              type[0].write(view, offset, ...data[key]);
              offset += type[0].size * type.length;
          }
      }

      return new Proxy({ buffer, size: this.size, view, schema: this.schema }, this.proxyHandler);
  }

  proxyHandler = {
      get(target, prop) {
          const schema = target.schema[prop];
          if (!schema) return undefined;

          let offset = 0;
          for (const [key, type] of Object.entries(target.schema)) {
              if (key === prop) break;
              offset += type.size;
          }

          if (schema.read) {
              return schema.read(target.view, offset);
          } else if (schema instanceof Object && schema.schema) {
              return new Structure(schema.schema).create(new Uint8Array(target.buffer, offset, schema.size));
          } else if (Array.isArray(schema) && schema[0].read) {
              return schema[0].read(target.view, offset);
          }
      },
      set(target, prop, value) {
          const schema = target.schema[prop];
          if (!schema) return false;

          let offset = 0;
          for (const [key, type] of Object.entries(target.schema)) {
              if (key === prop) break;
              offset += type.size;
          }

          if (schema.write) {
              schema.write(target.view, offset, value);
          } else if (schema instanceof Object && schema.schema) {
              const nested = new Structure(schema.schema).create(value);
              new Uint8Array(target.buffer, offset, schema.size).set(new Uint8Array(nested.buffer));
          } else if (Array.isArray(schema) && schema[0].write) {
              schema[0].write(target.view, offset, ...value);
          }
          return true;
      }
  };

  static from(buffer, schema) {
      const view = new DataView(buffer);
      return new Proxy({ buffer, size: buffer.byteLength, view, schema }, {
          get(target, prop) {
              const schema = target.schema[prop];
              if (!schema) return undefined;

              let offset = 0;
              for (const [key, type] of Object.entries(target.schema)) {
                  if (key === prop) break;
                  offset += type.size;
              }

              if (schema.read) {
                  return schema.read(target.view, offset);
              } else if (schema instanceof Object && schema.schema) {
                  return new Structure(schema.schema).create(new Uint8Array(target.buffer, offset, schema.size));
              } else if (Array.isArray(schema) && schema[0].read) {
                  return schema[0].read(target.view, offset);
              }
          },
          set(target, prop, value) {
              const schema = target.schema[prop];
              if (!schema) return false;

              let offset = 0;
              for (const [key, type] of Object.entries(target.schema)) {
                  if (key === prop) break;
                  offset += type.size;
              }

              if (schema.write) {
                  schema.write(target.view, offset, value);
              } else if (schema instanceof Object && schema.schema) {
                  const nested = new Structure(schema.schema).create(value);
                  new Uint8Array(target.buffer, offset, schema.size).set(new Uint8Array(nested.buffer));
              } else if (Array.isArray(schema) && schema[0].write) {
                  schema[0].write(target.view, offset, ...value);
              }
              return true;
          }
      });
  }
}

// Define the schema for Skills
const Skills = new Structure({
  singing: Structure.U8,
  dancing: Structure.U8,
  fighting: Structure.U8
});

// Define the schema for Color as a Tuple
const Color = Structure.Tuple(Structure.U8, Structure.U8, Structure.U8);

// Define the schema for Person
const Person = new Structure({
  firstName: Structure.String(10), // Fixed length 10 for ASCII string
  lastName: Structure.String(10),
  age: Structure.U7,
  skills: Skills,
  color: Color
});

// Create an instance of the structure Person
const bob = Person.create({
  firstName: 'Bob',
  lastName: 'King',
  age: 42,
  skills: { singing: 100, dancing: 100, fighting: 50 },
  color: [255, 0, 200]
});

console.log(bob.size); // Total size in bytes

// Access the properties of the structure
console.log(bob.buffer); // ArrayBuffer
console.log(bob.firstName); // 'Bob'
console.log(bob.skills.singing); // 100

// Create a clone of bob from the buffer
const bobClone = Structure.from(bob.buffer.slice(), Person.schema);
console.log(bobClone.firstName); // 'Bob'
console.log(bobClone.skills.singing); // 100
