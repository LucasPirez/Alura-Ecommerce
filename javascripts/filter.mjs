import { allProduc } from "./client-server.mjs";

const container = document.getElementById("header__container__input");
const inputSearch = document.getElementById("input__search");

let str = "";
let arr = [];

inputSearch.onfocus = (e) => {
  container.style.transform = "scale(1)";
};

inputSearch.onblur = (e) => {
  setTimeout(() => {
    container.style.transform = "scale(0)";
  }, 200);
};

async function filter() {
  const response = await allProduc();

  const fragment = document.createDocumentFragment();
  console.log(response);
  inputSearch.onkeyup = (e) => {
    const { value } = e.target;
    console.log(arr, str, value);
    if (value.length >= 2) {
      response.forEach((j) => {
        console.log(j);
        j["arr"].map((u, i) => {
          if (!u["nameProduct"].includes(value)) {
            if (arr.indexOf(`${j["id"]}${u["id"]}`) !== -1) {
              const index = arr.indexOf(`${j["id"]}${u["id"]}`);
              arr.splice(index, 1);
            }
            const del = document.getElementById(`${j["id"]}${u["id"]}`);

            if (del !== null) {
              container.removeChild(del);
            }
          } else {
            if (arr.indexOf(`${j["id"]}${u["id"]}`) === -1) {
              const divContainer = document.createElement("div");
              const name = document.createElement("span");
              const span = document.createElement("span");
              const img = document.createElement("img");

              arr.push(`${j["id"]}${u["id"]}`);
              img.src = "images/link.svg";

              name.textContent = u["nameProduct"];
              name.appendChild(img);

              // name.href = "/";
              span.innerText = `${j["id"]}`;

              divContainer.id = `${j["id"]}${u["id"]}`;
              divContainer.classList.add("filter__select");
              divContainer.onclick = (e) => {
                e.preventDefault();

                window.location.hash = `#/productDescription?${u["id"]}?${j["id"]}`;
              };

              console.log(divContainer);
              divContainer.append(name, span);
              // divContainer.append(span);
              container.appendChild(divContainer);
            }
          }
        });
      });
    }
  };
}
filter();
