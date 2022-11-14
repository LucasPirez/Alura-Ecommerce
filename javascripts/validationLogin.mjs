import { validateinputs } from "./functions.js";

const inputsLogin = document.querySelectorAll("[data-login]");
const forma = document.getElementById("form_login");
const buttonLogin = document.getElementById("entrar__button");

validateinputs(inputsLogin, buttonLogin);

async function peticionUsers() {
  const response = await fetch("http://localhost:3000/users");
  const result = await response.json();
  console.log("hola");
  return result;
}

inputsLogin.forEach((u) => {
  u.addEventListener("focus", (e) => {
    buttonLogin.style.background = "blue";
    buttonLogin.textContent = "Enviar";
  });
});

buttonLogin.onclick = (e) => {
  e.preventDefault();

  const user = {
    email: inputsLogin[0].value,
    password: inputsLogin[1].value,
  };

  peticionUsers().then((data) => {
    data.forEach((u, i) => {
      if (
        u["email"] === user["email"] &&
        toString(u.password) === user.password
      ) {
        console.log("acertado");
        buttonLogin.textContent = "Entrar";
      } else {
        buttonLogin.style.background = "rgb(216, 38, 38)";
        buttonLogin.textContent = "Email y/o Contraseña invalidos";
      }
    });
  });
};
