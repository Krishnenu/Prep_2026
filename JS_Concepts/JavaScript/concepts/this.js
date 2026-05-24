// console.log(this);
// function a() {
//   console.log(this);
// }
// a();

// const a = () => {
//   console.log(this);
// };
// a();

// let obj = {
//   firstName: "krishnendu",
//   lastName: "Narayan",
//   printName: () => {
//     console.log(this.firstName + "  " + this.lastName);
//   },
// };

// console.log(obj.printName());

// op 1
// const name = "GLOBAL";

// const obj = {
//   name: "Krishnendu",
//   getName: () => console.log(this.name),
// };

// obj.getName();

//op 2

// const obj = {
//   name: "Krishnendu",
//   getName() {
//     return () => console.log(this.name);
//   },
// };

// const fn = obj.getName();
// fn();

//op 3

// const obj = {
//   name: "Krishnendu",
//   getName() {
//     return function () {
//       console.log(this.name);
//     };
//   },
// };

// const fn = obj.getName();
// fn();

// const obj = {
//   name: "Krishnendu",
//   getName() {
//     setTimeout(
//       function () {
//         console.log(this);
//       }.bind(this),
//       0,
//     );
//   },
// };

// obj.getName();

// const user = {
//   name: "Krish",
//   greet() {
//     console.log(this.name);
//   },
// };
// user.greet();

// const user = {
//   name: "Krish",
//   greet: () => {
//     console.log(this.name);
//   },
// };

// user.greet();
// need to clear

// function User(name) {
//   this.name = name;
// }

// const u1 = new User("Krish");
// console.log(u1.name);

// const user = {
//   name: "Krish",
//   greet() {
//     console.log(this.name);
//   },
// };

// const fn = user.greet;
// fn();

// const user = {
//   name: "Krish",
//   greet() {
//     setTimeout(function () {
//       console.log(this.name);
//     }, 1000);
//   },
// };

// user.greet();
