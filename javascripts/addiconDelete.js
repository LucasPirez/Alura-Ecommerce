import { allProduc } from "./client-server.mjs";
import { deleteModal } from "./agregarProducto.mjs";

export function add() {
  const allProductsItems = document.querySelectorAll("[data-product]");
  const productsTitle = document.querySelectorAll("[data-product-title]");
  productsTitle.forEach((u) => (u.style.display = "none"));

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
  allProductsItems.forEach((u) => addDeleteEdit(u));
}

export function remove() {
  const allProductsItems = document.querySelectorAll("[data-product]");
  const productsTitle = document.querySelectorAll("[data-product-title]");

  productsTitle.forEach((u) => (u.style.display = "flex"));

  allProductsItems.forEach((u) => u.lastChild.remove());
}
