import { validateinputs } from "./functions.mjs";
import {
  agregarProducto,
  getProduct,
  modify,
  deleteProduct,
} from "./client-server.mjs";

export const buttonSend = document.getElementById("button__agregar");
export const agregarTitle = document.getElementById("title__agregar__producto");
export const containerAgregar = document.getElementById("agregar__productos");
export const buttonEdit = document.getElementById("button__editar");
const modalContainer = document.getElementById("modal__container");
const buttonModal = document.getElementById("button__modal");
const buttonCancelar = document.getElementById("button__modal__cancelar");

const containerDrop = document.getElementById("drop__agregarProducto");
const inputFile = document.getElementById("input__file");
const img = document.getElementById("img__drop");
const inputs = document.querySelectorAll("[data-agregar]");

console.log(inputs);
img.style.zIndex = 9;

containerDrop.addEventListener("dragleave", (e) => {
  e.preventDefault();
  containerDrop.style.border = "2px dashed #ddd";
});

containerDrop.addEventListener("dragover", (e) => {
  e.preventDefault();

  containerDrop.style.border = "2px dashed #09a";
});

let imgSend;
let idSend = 0;
function cargar(file) {
  inputFile.files = file;

  const fileReader = new FileReader();
  fileReader.readAsDataURL(file[0]);

  fileReader.addEventListener("load", (e) => {
    img.setAttribute("src", e.target.result);
    imgSend = e.target.result;
  });
  console.log(fileReader);
}

containerDrop.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files;
  cargar(file);
});

inputFile.addEventListener("change", (e) => {
  const file = e.target.files;
  cargar(file);
  console.log(e.target.files);
});
validateinputs(inputs, buttonSend);

buttonSend.onclick = (e) => {
  e.preventDefault();
  const arr = ["starWars", "consolas", "diversos"];

  console.log(arr.indexOf(inputs[0].value));
  const data = {
    nameProduct: inputs[1].value,
    price: inputs[2].value,
    count: inputs[3].value,
    img: imgSend,
    descripcion: inputs[4].value,
  };
  if (imgSend !== undefined && arr.indexOf(inputs[0].value) !== -1) {
    if (location.hash.includes("#/edit")) {
      modify(idSend, inputs[0].value, data);
    } else {
      agregarProducto(inputs[0].value, data);
    }
  }
};

export async function formEdit(id, name) {
  const response = await getProduct(id, name);
  idSend = id;
  img.src = response.img;
  inputFile.files = containerDrop.dataTransfer;
  inputs[0].value = name;
  inputs[1].value = response.nameProduct;
  inputs[2].value = response.price;
  inputs[3].value = response.count || "no indicado";
  inputs[4].value = response.descripcion || "";

  buttonEdit.onclick = (e) => {};
}

export function deleteModal(positionX, positionY, id, name) {
  console.log(positionX, positionY);

  modalContainer.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  modalContainer.style.top = `${positionY - 60}px`;
  modalContainer.style.left = `${positionX - 165}px`;
  setTimeout(() => {
    modalContainer.style.top = `${60}px`;
    modalContainer.style.left = `${165}px`;
    modalContainer.style.transform = "scale(1)";
  }, 220);

  buttonModal.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  buttonCancelar.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    modalContainer.style.transform = "scale(0)";
    modalContainer.style.top = `${positionY - 60}px`;
    modalContainer.style.left = `${positionX - 165}px`;
    console.log("click");
  };
  window.document.body.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    modalContainer.style.transform = "scale(0)";
    modalContainer.style.top = `${positionY - 60}px`;
    modalContainer.style.left = `${positionX - 165}px`;
    console.log("click");
  };

  buttonModal.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    deleteProduct(id, name);
  };
}
