import { newMessage } from "./client-server.mjs";
import { validateinputs } from "./functions.js";

const form = document.getElementById("form_message");
const buttonFormMessage = document.getElementById("button_form_message");
const camposFormMessage = document.querySelectorAll("[data-form-message]");

validateinputs(camposFormMessage, buttonFormMessage);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const message = {
    nombre: camposFormMessage[0].value,
    mensaje: camposFormMessage[1].value,
  };

  newMessage(message).then((data) => {
    console.log(data);
  });
});
