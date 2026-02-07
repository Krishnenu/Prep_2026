// Promise.resolve()
//   .then(() => {
//     throw new Error("err");
//   })
//   .then(() => console.log("success"))
//   .catch(() => console.log("caught"));

// Promise.reject("A")
//   .catch((p) => p + "B")
//   .then((p) => Promise.reject(p + "C"))
//   .catch((p) => console.log(p));

// const arr = [1, 2, 3, 4, 5, 6];

// function arryOfPromse(pa) {
//   let res = [];
//   for (let i = 0; i < arr.length; i++) {
//     res.push(
//       new Promise((res, rej) => {
//         res(i);
//       }).then(console.log(i)),
//     );
//   }
//   return res;
// }

// const arrp = arryOfPromse(arr);
// function prAll(arrp) {
//   return Promise.all(arrp).then(() => {
//     console.log("resolved");
//   });
// }

// prAll(arrp);
// console.log(arrp);

// function p(d, t) {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       res(`resolved after+${t}`);
//     }, d);
//   });
// }
// p(3000, "3 sec")
//   .then((result) => {
//     console.log(result);
//     return p(1000, "1 sec");
//   })
//   .then((text) => {
//     console.log(text);
//     return p(2000, "2 sec");
//   })
//   .then((res) => console.log(res));
