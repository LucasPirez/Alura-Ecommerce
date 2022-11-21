import { allProduc } from "./client-server.mjs";
import { boolLogin } from "./validationLogin.mjs";
import { deleteModal } from "./agregarProducto.mjs";

export function add() {
  const con = document.querySelectorAll("[data-product-container]");
  const allProductsItems = document.querySelectorAll("[data-product]");
  const productsTitle = document.querySelectorAll("[data-product-title]");
  productsTitle.forEach((u) => (u.lastChild.style.display = "none"));

  con.forEach((u) => u.classList.add("products__container__conditional"));

  function addDeleteEdit(data) {
    const fragment = document.createDocumentFragment();
    const div = document.createElement("div");
    const aEdit = document.createElement("a");
    const imgDelete = document.createElement("img");
    const imgEdit = document.createElement("img");
    const idRecibido = data.getAttribute("data-id");
    const parentTitle = data.getAttribute("data-product");

    div.classList.add("container__edit__delete");
    aEdit.href = `#/edit?${idRecibido}?${parentTitle}`;

    imgDelete.src = "images/delete.svg";
    imgDelete.onclick = (e) => {
      e.preventDefault();

      const { clientX, clientY } = e;
      deleteModal(clientX, clientY, idRecibido, parentTitle);
    };

    imgEdit.src = "images/edit.svg";

    aEdit.appendChild(imgEdit);
    div.append(imgDelete, aEdit);
    fragment.append(div);

    return data.appendChild(fragment);
  }
  boolLogin && allProductsItems.forEach((u) => addDeleteEdit(u));
}

export function remove() {
  const con = document.querySelectorAll("[data-product-container]");

  const allProductsItems = document.querySelectorAll("[data-product]");
  const productsTitle = document.querySelectorAll("[data-product-title]");

  productsTitle.forEach((u) => (u.lastChild.style.display = "block"));
  con.forEach((u) => u.classList.remove("products__container__conditional"));

  if (allProductsItems[1].lastChild.textContent !== "Ver Producto") {
    allProductsItems.forEach((u) => u.lastChild.remove());
  }
}
