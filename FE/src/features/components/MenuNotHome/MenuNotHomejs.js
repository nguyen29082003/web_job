// const checkBar = () => {
//     const $ = document.querySelector.bind(document);
//     var widthScreen = window.innerWidth
//     console.log(widthScreen);
//     const bar = $(".bar")
//     const nav = $("nav")
//     if (widthScreen <= 800) {
//         nav.classList.add("menu--hident")
//         bar.style.display = "flex";
//     } else {
//         nav.classList.remove("menu--hident")
//         bar.style.display = "none";
//     }

import { checkBar } from "../../container/Functionjs";

// }
window.addEventListener("DOMContentLoaded", () => {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const ListMenu = $$("nav>.item");

    checkBar()

    ListMenu.forEach((item, index) => {
        item.onclick = () => {
            $(".item.active").classList.remove("active");
            item.classList.toggle("active")
        }
    });
    $(".bar").onclick = () => {
        console.log("ok");
        if ($(".bar.menu__bar")) {
            $(".bar.menu__bar").classList.remove("menu__bar");
            $(".bar").classList.add("menu__barClose")
            $(".menu--hident").style.right = "-16px"
            $(".menu--hident").style.opacity = "1"

        } else {
            $(".bar.menu__barClose").classList.remove("menu__barClose");
            $(".bar").classList.add("menu__bar")
            $(".menu--hident").style.right = "100%"
            $(".menu--hident").style.opacity = "0"
        }
    }
    window.addEventListener("resize", () => {
        checkBar()
    })
})