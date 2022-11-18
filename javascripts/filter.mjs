import { allProduc } from "./client-server.mjs";

const container = document.getElementById("header__container__input");
const inputSearch = document.getElementById("input__search");

let str = "";
let arr = [];

inputSearch.onfocus = (e) => {
  container.style.transform = "scale(1)";
};

inputSearch.onblur = (e) => {
  container.style.transform = "scale(0)";
};

async function filter() {
  const response = await allProduc();

  const fragment = document.createDocumentFragment();

  inputSearch.onkeyup = (e) => {
    const { value } = e.target;
    if (value.length >= 2) {
      response.forEach((j) => {
        j["arr"].map((u, i) => {
          console.log(u);
          if (!u["nameProduct"].includes(value)) {
            if (arr.indexOf(`productId${u["id"]}`) !== -1) {
              const index = arr.indexOf(`productId${u["id"]}`);
              arr.splice(index, 1);
            }
            const del = document.getElementById(`productId${u["id"]}`);

            if (del !== null) {
              container.removeChild(del);
            }
          } else {
            if (arr.indexOf(`productId${u["id"]}`) === -1) {
              const divContainer = document.createElement("div");
              const name = document.createElement("span");
              const span = document.createElement("span");
              const img = document.createElement("img");

              arr.push(`productId${u["id"]}`);
              img.src = "images/link.svg";

              name.textContent = u["nameProduct"];
              name.appendChild(img);

              // name.href = "/";
              span.innerText = `${j["id"]}`;

              divContainer.id = `productId${u["id"]}`;
              divContainer.classList.add("filter__select");
              console.log(divContainer);
              divContainer.append(name, span);
              // divContainer.append(span);
              container.appendChild(divContainer);
            }
          }
        });
      });
      // for (const val in response) {
      //   response[val].map((u, i) => {
      //     if (!u["nameProduct"].includes(value)) {
      //       if (arr.indexOf(`productId${u["id"]}`) !== -1) {
      //         const index = arr.indexOf(`productId${u["id"]}`);
      //         arr.splice(index, 1);
      //       }
      //       const del = document.getElementById(`productId${u["id"]}`);

      //       if (del !== null) {
      //         container.removeChild(del);
      //       }
      //     } else {
      //       if (arr.indexOf(`productId${u["id"]}`) === -1) {
      //         const divContainer = document.createElement("div");
      //         const name = document.createElement("span");
      //         const span = document.createElement("span");
      //         const img = document.createElement("img");

      //         arr.push(`productId${u["id"]}`);
      //         img.src = "images/link.svg";

      //         name.textContent = u["nameProduct"];
      //         name.appendChild(img);

      //         // name.href = "/";
      //         span.innerText = `${val}`;

      //         divContainer.id = `productId${u["id"]}`;
      //         divContainer.classList.add("filter__select");
      //         console.log(divContainer);
      //         divContainer.append(name, span);
      //         // divContainer.append(span);
      //         container.appendChild(divContainer);
      //       }
      //     }
      //   });
      // }
    }
  };
}
filter();
