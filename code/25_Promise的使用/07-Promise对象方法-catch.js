// let promise = new Promise((resolve, reject) => {
//   // resolve();
//   // reject("rejected status")
//   throw new Error("rejected status");
// });

// 1.当executor抛出异常时, 也是会调用错误(拒绝)捕获的回调函数的
// promise.then(
//   (res) => {
//     console.log("res:", res);
//   },
//   (err) => {
//     console.log("err:", Object.getOwnPropertyNames(err));
//     console.log(err.stack);
//   }
// );

// // 2.通过catch方法来传入错误(拒绝)捕获的回调函数
// // promise/a+规范
// promise.catch((err) => {
//   console.log("err:", err);
// });

// promise.then(res => {
//   // return new Promise((resolve, reject) => {
//   //   reject("then rejected status")
//   // })
//   throw new Error("error message")
// }).catch(err => {
//   console.log("err:", err)
// })

// 3.拒绝捕获的问题(前面课程)
/*
const promise = new Promise((resolve, reject) => {
  resolve('111111')
})
promise.then((res) => {
  console.log('res:', res)
})
promise.catch((err) => {})

promise
  .then((res) => {})
  .then((res) => {
    throw new Error('then error message')
  })
  .catch((err) => {
    console.log('err:', err)
  })
  */

// 4.catch方法的返回值
const promise = new Promise((resolve, reject) => {
  reject("111111");
  // throw new Error("aaa");
});

promise
  .then((res) => {
    console.log("res:", res);
  })
  .catch((err) => {
    console.log("进入catch");
    // catch依旧会返回promise ，而且返回数据相当于调用了resolve，这样之后会走then
    return "catch reject";
  })
  .then((res) => {
    console.log("res result:", res);
  })
  .catch((err) => {
    console.log("err result:", err);
  });
