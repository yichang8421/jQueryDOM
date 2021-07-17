// window.$ = window.jQ = function (selectorOrArrayOrTemplete) {
//     let elements;
//     if (typeof selectorOrArrayOrTemplete === 'string') {
//         /* jQ是jQuery函数 */
//         elements = document.querySelectorAll(selectorOrArrayOrTemplete);
//     } else if (selectorOrArrayOrTemplete instanceof Array) {
//         elements = selectorOrArrayOrTemplete;
//     }
//
// //    jQuery返回的是可操作对象
// //     const api = {
//     /* api是一个jQuery对象（jQuery函数构造出来的对象） */
//
//     return {
//         addClass(className) {
//             for (let i = 0; i < elements.length; i++) {
//                 elements[i].classList.add(className);
//             }
//             // return api;
//             //返回api本身，这样可以方便链式操作
//             /* 而api.addClass()中的api可以用this表示 */
//             return this;
//         },
//         //    addClass()访问了作用域外部的变量elements（父函数申明的变量），因此addClass()是一个闭包
//         find(selector) {
//             let arr = [];
//             for (let i = 0; i < elements.length; i++) {
//                 const container = Array.from(elements[i].querySelectorAll(selector));
//                 arr = arr.concat(container);
//             }
//             arr.oldApi = this;
//             //    将当前的this保存到arr.oldApi中。当前的this是该时刻的api对象
//             return jQ(arr);
//         },
//
//         oldApi: selectorOrArrayOrTemplete.oldApi,
//         //     当前api对象的oldApi属性值拷贝传入参数的oldApi属性值
//
//         end() {
//             return this.oldApi;
//         },
//
//         each(fn) {
//             for (let i = 0; i < elements.length; i++) {
//                 fn.call('', elements[i], i)
//             }
//             return this;
//         },
//
//         parent() {
//             const arr = [];
//             this.each((node) => {
//                 if (arr.indexOf(node.parentNode) === -1) {
//                     arr.push(node.parentNode);
//                 }
//             });
//             return jQ(arr);
//         },
//
//         print() {
//             console.log(elements);
//         },
//
//         children() {
//             const arr = [];
//             this.each((node) => {
//                 if (arr.indexOf(node.parentNode) < 0) {
//                     arr.push(...node.children);
//                     //    ...展开操作符，将数组展开
//                     //     等价于：
//                     //    arr.push(node.children[0],node.children[1],...,node.children[n]);
//                 }
//             });
//             return jQ(arr);
//         }
//         // }
//     }
//     // return api;
// }
