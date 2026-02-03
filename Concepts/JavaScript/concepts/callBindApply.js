// call in js
// .call(thisArgs,arg1,arg2,...);

// function add(a, b) {
//   return a + b;
// }

// console.log(add.apply(null, [1, 2]));

// .call and .apply can set the this context explicitly when invoking methods on different objects.
// const person = {
//   firstName: "krishnendu",
//   great: function () {
//     console.log(`welcome ${this.firstName}`);
//   },
// };

// const other = { firstName: "narayan" };

// person.great.apply(other);
