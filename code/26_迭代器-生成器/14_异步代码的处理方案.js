// request.js
function requestData(url) {
  // 异步请求的代码会被放入到executor中
  return new Promise((resolve, reject) => {
    // 模拟网络请求
    setTimeout(() => {
      // 拿到请求的结果
      resolve(url);
    }, 500);
  });
}

// 需求:
// 1> url: why -> res: why
// 2> url: res + "aaa" -> res: whyaaa
// 3> url: res + "bbb" => res: whyaaabbb

// 1.第一种方案: 多次回调
// 回调地狱
// requestData("why").then(res => {
//   requestData(res + "aaa").then(res => {
//     requestData(res + "bbb").then(res => {
//       console.log(res)
//     })
//   })
// })

// 2.第二种方案: Promise中then的返回值来解决  缺点 ：可读性很差
// requestData("why")
//   .then((res) => {
//     return requestData(res + "aaa");
//   })
//   .then((res) => {
//     return requestData(res + "bbb");
//   })
//   .then((res) => {
//     console.log(res);
//   });

// 3.第三种方案: Promise + generator实现
function* getData() {
  const res1 = yield requestData("why");
  const res2 = yield requestData(res1 + "aaa");
  const res3 = yield requestData(res2 + "bbb");
  const res4 = yield requestData(res3 + "ccc");
  console.log(res4, "*********");
}
const generator = getData();
generator.next().value.then((res) => {
  //这里在处理async面试题，便于理解
  generator.next(res);
});
async function bar() {
  console.log("返回一个promise");
}
async function foo() {
  await bar(); //这里得到一个promise
  console.log("我被放到微队列");
}

const ge = getData(); //不执行一行代码
console.log(ge.next());
console.log(ge.next());
console.log(ge.next());
console.log(ge.next());
console.log(ge.next()); //done:true

function* getDepartment() {
  const user = yield requestData("id");
  const department = yield requestData(user.departmentId);
}

// 1> 手动执行生成器函数
// const generator = getData()
// generator.next().value.then((res) => {
//   generator.next(res).value.then((res) => {
//     generator.next(res).value.then((res) => {
//       generator.next(res).value.then((res) => {
//         generator.next(res)
//       })
//     })
//   })
// })

// 2> 自己封装了一个自动执行的函数
// function execGenerator(genFn) {
//   const generator = genFn()
//   function exec(res) {
//     const result = generator.next(res)
//     if (result.done) {
//       return result.value
//     }
//     result.value.then(res => {
//       exec(res)
//     })
//   }
//   exec()
// }

// execGenerator(getData)
// execGenerator(getDepartment)

// 3> 第三方包co自动执行
// TJ: co/n(nvm)/commander(coderwhy/vue cli)/express/koa(egg)
// 尤雨溪偶像是TJ
// const co = require('co')
// co(getData)

async function getData() {
  const res1 = await requestData("why");
  const res2 = await requestData(res1 + "aaa");
  const res3 = await requestData(res2 + "bbb");
  const res4 = await requestData(res3 + "ccc");
  console.log(res4);
}
getData();
