// const user = {
//   id: 1,
//   name: "Krishnendu",
//   contact: {
//     email: "krish@example.com",
//     address: {
//       city: "Bangalore",
//       state: "Karnataka",
//       socity: { name: "sobha", area: { name: "pantandur" } },
//     },
//   },
// };

// function flatObj(obj, result = {}) {
//   for (let key in obj) {
//     if (typeof obj[key] === "object" && obj[key] !== null) {
//       flatObj(obj[key], result);
//     } else {
//       result[key] = obj[key];
//     }
//   }
//   return result;
// }

// // console.log(flatObj(user));

// console.log({ ...user });

Array.prototype.add = function () {
  return this[0] + this[1];
};

console.log([3, 4].add());
