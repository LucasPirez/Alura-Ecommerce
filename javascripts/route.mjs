import { iniciarSesion, boolLogin } from "./validationLogin.mjs";
import { containerHome } from "./homePage/homeProducts.mjs";
import { add, remove } from "./addiconDelete.js";

import {
  buttonSend,
  agregarTitle,
  containerAgregar,
  formEdit,
} from "./agregarProducto.mjs";
// const allPorductTitle = document.getElementById("all__products__title");
console.log(location);
iniciarSesion.style.display = "none";
console.log(location.hash);

window.addEventListener("load", (e) => {
  location.hash = "#/";
  containerAgregar.style.display = "none";
});

window.addEventListener("hashchange", () => {
  const route = window.location.hash;

  if (route.includes("#/agregarModificar") || route.includes("#/edit")) {
    console.log(boolLogin);
    if (!boolLogin) {
      containerHome.style.display = "none";
      iniciarSesion.style.display = "none";
      containerAgregar.style.display = "block";
    } else {
      window.location.hash = "/";
    }

    if (route.includes("#/agregarModificar")) {
      buttonSend.textContent = "Agregar Producto";
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
      break;
    case "#/home":
      remove();
      containerHome.style.display = "block";
      iniciarSesion.style.display = "none";
      break;
    case "#/allProducts":
      add();
      break;
    default:
      break;
  }
});
