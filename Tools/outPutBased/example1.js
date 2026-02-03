let a = "hellow";
let b = "world";

// function fn(value) {
//   return !value;
// }

// console.log(fn(0));

async function foo() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}

foo();

console.log("C");
setTimeout(() => {
  console.log("D");
}, 0);

const promise = new Promise((res) => {
  console.log("E");
  res();
});
console.log("F");
// ACFBED
