import { allProduc } from "./client-server.mjs";

const container = document.getElementById("header__container__input");
const inputSearch = document.getElementById("input__search");

let str = "";
let arr = [];
async function filter() {
  const response = await allProduc();

  const fragment = document.createDocumentFragment();

  inputSearch.onkeyup = (e) => {
    if (inputSearch.value.length >= 1) {
      for (const value in response) {
        response[value].map((u, i) => {
          if (!u["nameProduct"].includes(inputSearch.value)) {
            if (arr.indexOf(`productId${u["id"]}`) !== -1) {
              const index = arr.indexOf(`productId${u["id"]}`);
              console.log(index);
              arr = arr.splice(index, 1);
            }
            const del = document.getElementById(`productId${u["id"]}`);

            if (del !== null) {
              container.removeChild(del);
            }
          } else {
            const divContainer = document.createElement("div");
            const name = document.createElement("span");
            if (arr.indexOf(`productId${u["id"]}`) === -1) {
              arr.push(`productId${u["id"]}`);

              divContainer.id = `productId${u["id"]}`;
              divContainer.classList.add("filter__select");
              name.textContent = u["nameProduct"];
              console.log(divContainer);
              divContainer.appendChild(name);
              container.appendChild(divContainer);
            }
          }
        });
      }
    }
    console.log(arr);
  };
}
filter();
