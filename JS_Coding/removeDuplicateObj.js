const obj = [{ a: 1, b: 20, c: 5 }];

const result = Object.fromEntries(
  Object.entries(...obj)
    .filter(([k, v]) => v > 10)
    .map(([k, v]) => [k, v * 10]),
);

console.log(result);
