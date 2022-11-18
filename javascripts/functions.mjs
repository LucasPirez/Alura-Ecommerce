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
  url: {
    valueMissing: "Este campo no puede estar vacio",
    typeMismatch: "El formato es incorrecto",
  },
  precio: {
    valueMissing: "Este campo no puede estar vacio",
    typeMismatch: "Solo numeros",
  },
  categoria: {
    valueMissing: "Este campo no puede estar vacio",
  },
  file: {
    valueMissing: "Ningun archivo seleccionado",
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
      console.log(u.validity.valid);
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

      if (disabled.indexOf(true) === -1 && disabled.length === inputs.length) {
        buttonSend.classList.remove("button__disabled");
      } else {
        buttonSend.classList.add("button__disabled");
      }
    });
  });
}
