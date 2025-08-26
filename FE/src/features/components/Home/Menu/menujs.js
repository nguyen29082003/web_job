import { checkBar, openMenu } from "../../../container/Functionjs";

window.addEventListener("DOMContentLoaded", () => {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  const ListMenu = $$("nav>.item");
  // const ListRegister = $$(".register__box__left--account>.account");
  // ListRegister.forEach((item, index) => {
  //     item.onclick = () => {
  //         $(".account.active").classList.remove("active");
  //         item.classList.toggle("active")
  //     }
  // });
  checkBar();

  ListMenu.forEach((item, index) => {
    item.onclick = () => {
      $(".item.active").classList.remove("active");
      item.classList.toggle("active");
    };
  });
  openMenu();
  window.addEventListener("resize", () => {
    checkBar();
  });
});
