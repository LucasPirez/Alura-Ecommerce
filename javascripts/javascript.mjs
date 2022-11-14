const banner = document.getElementById("banner");
//login
const loginButton = document.getElementById("loggin_button");
const iniciarSesion = document.getElementById("iniciarSesion");
const entrarButton = document.getElementById("entrar__button");
//products
const productsTitle = document.querySelectorAll("[data-product-title]");
const products = document.getElementById("products");
const allPorductTitle = document.getElementById("all__products__title");
const allProductsItems = document.querySelectorAll("[data-product]");
//agregar productos
const agregarProducts = document.getElementById("agregar__productos");
const buttonAgregar = document.getElementById("agregar__product__button");

agregarProducts.style.display = "none";
iniciarSesion.style.display = "none";

loginButton.onclick = (e) => {
  e.preventDefault();
  console.log("hola");
  products.style.display = "none";
  banner.style.display = "none";
  iniciarSesion.style.display = "flex";
  loginButton.style.display = "none";
  allPorductTitle.style.display = "none";
};

// vista eliminar y editar imagenes
console.log(allProductsItems);
function addDeleteEdit(data) {
  const fragment = document.createDocumentFragment();
  const div = document.createElement("div");
  const imgDelete = document.createElement("img");
  const imgEdit = document.createElement("img");

  div.classList.add("container__edit__delete");

  imgDelete.src = "images/delete.svg";
  imgEdit.src = "images/edit.svg";

  div.append(imgDelete, imgEdit);
  fragment.append(div);

  return data.appendChild(fragment);
}
allPorductTitle.style.display = "none";

entrarButton.onclick = (e) => {
  e.preventDefault();

  products.style.display = "block";
  banner.style.display = "block";
  iniciarSesion.style.display = "none";
  loginButton.style.display = "block";
  allProductsItems.forEach((u) => u.lastChild.remove());
};

function allProducts() {
  productsTitle.forEach((u) => (u.style.display = "none"));
  banner.style.display = "none";
  allPorductTitle.style.display = "flex";
  allProductsItems.forEach((u) => addDeleteEdit(u));
}

//vista agregar products

buttonAgregar.onclick = (e) => {
  e.preventDefault();

  products.style.display = "none";
  banner.style.display = "none";
  iniciarSesion.style.display = "none";
  loginButton.style.display = "none";
  allPorductTitle.style.display = "none";
  agregarProducts.style.display = "block";
};
