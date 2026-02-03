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

const obj = {
  name: "Krishnendu",
  getName() {
    setTimeout(
      function () {
        console.log(this.name);
      }.bind(this),
      0,
    );
  },
};

obj.getName();
