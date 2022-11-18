import { validateinputs } from "./functions.mjs";

export const iniciarSesion = document.getElementById("iniciarSesion");
const loginLogout = document.getElementById("loggin_button");
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
export let boolLogin = false;

buttonLogin.onclick = (e) => {
  const user = {
    email: inputsLogin[0].value,
    password: inputsLogin[1].value,
  };

  peticionUsers().then((data) => {
    console.log(data);
    data.forEach((u, i) => {
      console.log(u.password.toString(), user);
      if (
        u["email"] === user["email"] &&
        u.password.toString() === user.password
      ) {
        boolLogin = true;
        window.location.hash = "/agregarModificar";
        loginLogout.textContent = "Logout";
      } else {
        buttonLogin.style.background = "rgb(216, 38, 38)";
        buttonLogin.textContent = "Email y/o Contraseña invalidos";
      }
    });
  });
};
