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

console.log(inputFile.files);
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

export function cleanForm() {
  inputFile.value = "";
  img.src = "";
  inputs[0].value = "";
  inputs[1].value = "";
  inputs[2].value = "";
  inputs[3].value = "";
  inputs[4].value = "";
}

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
      modify(idSend, inputs[0].value, data).then((data) => {
        console.log(data);
        cleanForm();
      });
    } else {
      agregarProducto(inputs[0].value, data).then((data) => {
        console.log(data);

        cleanForm();
      });
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
}

function cerrar(a, positionX, positionY) {
  a.style.transform = "scale(0)";
  a.style.top = `${positionY - 60}px`;
  a.style.left = `${positionX - 165}px`;
}

export function deleteModal(positionX, positionY, id, name, index) {
  modalContainer.style.top = `${positionY - 60}px`;
  modalContainer.style.left = `${positionX - 165}px`;
  setTimeout(() => {
    modalContainer.style.top = `20%`;
    modalContainer.style.left = `calc(50% - 165px)`;
    modalContainer.style.transform = "scale(1)";
  }, 220);

  buttonCancelar.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    cerrar(modalContainer, positionX, positionY);
  };

  buttonModal.onclick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const response = await deleteProduct(id, name);
    if (response.ok) {
      cerrar(modalContainer, positionX, positionY);
      document.querySelectorAll(`[data-product=${name}]`)[index].style.display =
        "none";
    } else {
      alert("Ha ocurrido un error");
    }
  };
}
