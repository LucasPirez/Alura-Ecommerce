import { iniciarSesion, boolLogin } from "./validationLogin.mjs";
import { containerHome } from "./homePage/homeProducts.mjs";
import { add, remove } from "./addiconDelete.js";
import { decriptionContainer } from "./productDescription.mjs";

import {
  buttonSend,
  agregarTitle,
  containerAgregar,
  formEdit,
  cleanForm,
} from "./agregarProducto.mjs";
import { productDescriptionGenerate } from "./productDescription.mjs";
const banner = document.getElementById("banner");
const allProductsTitle = document.getElementById("all__products__title");
// const agregarProductConditional = document.getElementById(
//   "all__products__title"
// );
// const allPorductTitle = document.getElementById("all__products__title");
console.log(location);
iniciarSesion.style.display = "none";
decriptionContainer.style.display = "none";
allProductsTitle.style.display = "none";

console.log(location.hash);

window.addEventListener("load", (e) => {
  location.hash = "#/";
  containerAgregar.style.display = "none";
});

window.addEventListener("hashchange", () => {
  const route = window.location.hash;

  if (route.includes("#/productDescription")) {
    const [rou, id, name] = route.split("?");

    containerHome.style.display = "none";
    iniciarSesion.style.display = "none";
    banner.style.display = "none";
    decriptionContainer.style.display = "flex";
    allProductsTitle.style.display = "none";

    productDescriptionGenerate(id, name);
  }

  if (route.includes("#/agregarModificar") || route.includes("#/edit")) {
    console.log(boolLogin);
    decriptionContainer.style.display = "none";
    allProductsTitle.style.display = "none";

    if (boolLogin) {
      containerHome.style.display = "none";
      iniciarSesion.style.display = "none";
      containerAgregar.style.display = "block";
    } else {
      window.location.hash = "/";
    }

    if (route.includes("#/agregarModificar")) {
      buttonSend.textContent = "Agregar Producto";
      cleanForm();
    } else {
      buttonSend.textContent = "Editar Producto";
      const [rou, id, name] = route.split("?");
      console.log(id, name);
      formEdit(+id, name).then((data) => {
        console.log(data);
      });
    }
  }

  switch (route) {
    case "#/login":
      containerHome.style.display = "none";
      iniciarSesion.style.display = "flex";
      allProductsTitle.style.display = "none";
      decriptionContainer.style.display = "none";
      banner.style.display = "none";
      containerAgregar.style.display = "none";

      break;
    case "#/":
      remove();
      containerHome.style.display = "block";
      iniciarSesion.style.display = "none";
      decriptionContainer.style.display = "none";
      allProductsTitle.style.display = "none";
      banner.style.display = "block";
      containerAgregar.style.display = "none";

      break;
    case "#/allProducts":
      banner.style.display = "none";
      allProductsTitle.style.display = "flex";
      decriptionContainer.style.display = "none";
      containerAgregar.style.display = "none";

      if (!boolLogin) {
        allProductsTitle.lastElementChild.style.display = "none";
      }
      add();
      break;

    default:
      break;
  }
});
