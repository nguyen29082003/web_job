// const cutText = (text) => {
//     var newText = [];
//     var size;
//     var widthScreen = window.innerWidth
//     if (widthScreen >= 1125) {
//         size = 35
//     } else if (widthScreen >= 992 && widthScreen < 1125) {
//         size = 28
//     } else if (widthScreen >= 769 && widthScreen < 992) {
//         size = 50
//     } else if (widthScreen >= 576 && widthScreen < 769) {
//         size = 35
//     } else if (widthScreen >= 306 && widthScreen < 576) {
//         size = 22
//     } else {
//         size = 15
//     }
//     for (let i = 0; i < text.length; i++) {
//         if (i <= size) {
//             newText.push(text[i])
//         } else {
//             newText.push(" ...")
//             break;
//         }
//     }
//     return newText.join("");
// }
// window.addEventListener("DOMContentLoaded", () => {
//     const $ = document.querySelector.bind(document);
//     const $$ = document.querySelectorAll.bind(document);

//     const titleJobAll = $$(".jobTitle");
//     titleJobAll.forEach((item, index) => {
//         $$(".jobTitle")[index].innerText = cutText(item.innerText)
//     });

//     window.addEventListener("resize", () => {
//         titleJobAll.forEach((item, index) => {
//             console.log(item.innerText);
//             $$(".jobTitle")[index].innerText = cutText(item.innerText)
//         });
//     })
// })