import { createHeader } from "./titleProducts.mjs";
import { allProduc } from "../client-server.mjs";

export const containerHome = document.getElementById("products");
const fragment = document.createDocumentFragment();

function create(data, title, index) {
  const divImg = document.createElement("div");
  const img = document.createElement("img");
  const fig = document.createElement("figcaption");
  const a = document.createElement("a");
  const p = document.createElement("p");

  divImg.classList.add("products__container_img");
  divImg.setAttribute("data-product", `${title}`);
  divImg.setAttribute("data-id", data.id);
  divImg.setAttribute("data-index", index);
  img.setAttribute("src", data.img);
  img.alt = data.nameProduct;
  img.classList.add("products__img");
  fig.classList.add("products__figcaption");
  fig.textContent = data.nameProduct;
  p.classList.add("products__price");
  p.textContent = `$${data.price}`;
  a.href = `#/productDescription?${data.id}?${title}`;
  a.textContent = "Ver Producto";

  a.classList.add("products__link");

  divImg.append(img, fig, p, a);
  return divImg;
}

(async () => {
  const response = await allProduc();
  response.forEach((u, i) => {
    const section = document.createElement("section");
    section.classList.add("products");
    section.append(createHeader(u.id));
    const div = document.createElement("div");
    div.classList.add("products__container");
    div.setAttribute("data-product-container", `${u.id}`);
    u["arr"].forEach((j, index) => {
      div.appendChild(create(j, u.id, index));
    });

    section.append(div);
    fragment.append(section);
    containerHome.append(fragment);
  });
})();
