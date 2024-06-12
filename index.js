import { menuArray } from "./data.js";

const mainSection = document.querySelector(".main-section");
let newItem = "";
const renderElements = menuArray.forEach((item) => {
  return (newItem += `
     <h1>${item.name}</h1>
    <img src="${item.image}">`);
});

mainSection.innerHTML = newItem;
