export const errorMessages = {
  nombre: {
    valueMissing: "Este campo no puede estar vacio",
  },
  mensaje: {
    valueMissing: "Este campo no puede estar vacio",
    tooLong: "El mensaje es muy corto",
  },
  email: {
    typeMismatch: "El formato es incorrecto",
    valueMissing: "Este campo no puede estar vacio",
  },
  password: {
    valueMissing: "Este campo no puede estar vacio",
    tooShort: "El campo es muy corto",
  },
};

export function mostrarError(type, input) {
  const errors = ["valueMissing", "tooLong", "typeMismatch", "tooShort"];
  let err = "";
  errors.forEach((u) => {
    console.log(input.validity);
    console.log(u);
    if (input.validity[u]) {
      console.log(errorMessages[type]);
      err = errorMessages[type][u];
    }
  });
  return err;
}

export function validateinputs(inputs, buttonSend) {
  const disabled = [];
  inputs.forEach((u, i) => {
    u.addEventListener("blur", (e) => {
      if (u.validity.valid) {
        u.parentElement.querySelector("span").innerText = "";
        u.value = e.target.value;
        disabled[i] = false;
      } else {
        u.parentElement.querySelector("span").innerText = mostrarError(
          u.name,
          u
        );
        disabled[i] = true;
      }

      if (disabled.indexOf(true) === -1 && disabled.length === 2) {
        buttonSend.classList.remove("button__disabled");
      } else {
        buttonSend.classList.add("button__disabled");
      }
    });
  });
}
