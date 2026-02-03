const arr = [1, [2, [20]], 3, [4, [5]]];

function flatArray(array) {
  let res = [];
  if (array.length === 0) {
    throw new Error("plaese enter valid args");
  }
  for (let a of array)
    if (Array.isArray(a)) {
      res = res.concat(flatArray(a));
    } else {
      res.push(a);
    }
  return res;
}

console.log(flatArray(arr));
