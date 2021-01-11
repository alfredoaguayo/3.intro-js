const target = { a : 1, b : 4};

const source = { b : 7, c : 2};

const nuevo = { d : 6, a : 4};

const miArray = Object.assign(target, source)

console.log(target);

console.log(source);

console.log(miArray);

const miArray2 = Object.assign(miArray, nuevo)

console.log(source);

console.log(miArray2);
