// class Person {

// }

// class Student extends Person {

// }

class HYArray extends Array {
  firstItem() {
    return this[0];
  }

  lastItem() {
    return this[this.length - 1];
  }
}

var arr = new HYArray(1, 2, 3);
console.log(arr.firstItem());
console.log(arr.lastItem());

arr.map((item) => {
  console.log(item * 2);
  return item * 2;
});

console.log(arr);
