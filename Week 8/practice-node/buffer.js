const buffer1 = Buffer.from('Hello');
console.log(buffer1);

const buffer2 = Buffer.from([65, 66, 67]);
console.log(buffer2.toString());

// alloc method is used to create a buffer and initialize it
const buffer3 = Buffer.alloc(5);
console.log(buffer3);

buffer3.write('Hi');
console.log(buffer3.toString());

// allocUnsafe method is used to create a buffer without initializing it 
const buffer4 = Buffer.allocUnsafe(5);
console.log(buffer4);