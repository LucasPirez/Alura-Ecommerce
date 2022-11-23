import { validateinputs } from "./functions.mjs";
import { peticionUsers } from "./client-server.mjs";

export const iniciarSesion = document.getElementById("iniciarSesion");
const loginLogout = document.getElementById("loggin_button");
const inputsLogin = document.querySelectorAll("[data-login]");
const forma = document.getElementById("form_login");
const buttonLogin = document.getElementById("entrar__button");

validateinputs(inputsLogin, buttonLogin);

if (sessionStorage.getItem("auth") === "true") {
  loginLogout.textContent = "Logout";
}

inputsLogin.forEach((u) => {
  u.addEventListener("focus", (e) => {
    buttonLogin.style.background = "#2a7ae4";
    buttonLogin.textContent = "Enviar";
  });
});

loginLogout.onclick = (e) => {
  const { textContent } = e.target;
  console.log(textContent);
  if (textContent === "Logout") {
    loginLogout.textContent = "Login";
    sessionStorage.setItem("auth", "false");

    window.document.location.hash = "#/";
  } else {
    window.document.location.hash = "#/login";
  }
};

buttonLogin.onclick = async (e) => {
  const user = {
    email: inputsLogin[0].value,
    password: inputsLogin[1].value,
  };

  const response = await peticionUsers();

  console.log(response);
  let coincidence = false;

  response !== [] &&
    response.forEach((u, i) => {
      console.log(u.password.toString(), user);
      if (
        u["email"] === user["email"] &&
        u.password.toString() === user.password
      ) {
        coincidence = true;
      }
    });

  if (coincidence) {
    sessionStorage.setItem("auth", "true");
    window.document.location.hash = "/agregarModificar";
    loginLogout.textContent = "Logout";
  } else {
    buttonLogin.style.background = "rgb(216, 38, 38)";
    buttonLogin.textContent = "Email y/o Contraseña invalidos";
  }
};
