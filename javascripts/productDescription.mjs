import { getProduct } from "./client-server.mjs";

export const decriptionContainer =
  document.getElementById("productDescription");
const descriptionImg = document.getElementById("descriptionImg");
const descriptionTitle = document.getElementById("descriptionTitle");
const descriptionPrice = document.getElementById("descriptionPrice");
const descriptionStock = document.getElementById("descriptionStock");
const buttonSumaCount = document.querySelectorAll("[data-button-descripton]");
const descriptionText = document.getElementById("descriptionText");
const descriptionCount = document.getElementById("description__count");
const buttonCarrito = document.getElementById("button__agregar__carrito");
const buttonComprar = document.getElementById("button__comprar");

export async function productDescriptionGenerate(id, name) {
  try {
    const response = await getProduct(id, name);
    console.log(response);
    descriptionCount.innerText = "1";
    descriptionImg.src = response.img;
    descriptionStock.value = response.count;
    descriptionText.innerText =
      response.descripcion && response.descripcion !== ""
        ? response.descripcion
        : "Producto sin descripcion";
    descriptionTitle.innerText = response.nameProduct;
    descriptionPrice.innerText = `$ ${response.price}`;
    descriptionStock.innerText = `Cantidad: ${response.count}`;
    descriptionPrice.value = response.price;
    descriptionStock.value = response.count;
    buttonCarrito.innerText = ` Agregar Carrito x 1`;
    buttonComprar.innerText = `Comprar x ${response.price}`;
  } catch (error) {
    console.log(error);
  }
}

buttonSumaCount.forEach((u) => {
  u.onclick = (e) => {
    e.preventDefault();
    console.log(descriptionStock.innerText);
    console.log(
      Number(descriptionStock.innerText),
      Number(descriptionCount.innerText)
    );
    if (e.target.value === "-" && Number(descriptionCount.innerText) > 1) {
      descriptionCount.innerText = +descriptionCount.innerText - 1;
    }
    if (
      e.target.value === "+" &&
      Number(descriptionStock.value) > Number(descriptionCount.innerText)
    ) {
      descriptionCount.innerText = +descriptionCount.innerText + 1;
    }

    if (Number(descriptionCount.innerText) > 0) {
      buttonCarrito.innerText = `Agregar Carrito x ${descriptionCount.innerText}`;
      buttonComprar.innerText = `Comprar x $${
        +descriptionPrice.value * +descriptionCount.innerText
      }`;
    } else {
      buttonCarrito.innerText = "Agregar Carrito ";
      buttonComprar.innerText = "Comprar";
    }
  };
});
