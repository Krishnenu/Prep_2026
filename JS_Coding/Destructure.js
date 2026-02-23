const arr = [10, 20, 30];
const [x, , y] = arr;
console.log(x, y);

const [a = 1, b = 2] = [10, 40];

console.log(a, b);

let d = 1;
let e = 2;

[d, e] = [d, e];

console.log(d, e); // 2 1

const obj = { a: 1, k: { s: 2 } };

const {
  k: { s },
} = obj;
console.log(s);
