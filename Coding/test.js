const a = [1, 2, 4, 5, 6].reduce((acc, cur) => {
  if (cur !== 5) {
    acc = acc + cur;
  }
  return acc;
}, 0);

console.log(a);

consollo;
