export async function allProduc() {
  console.log("peticion all product");
  const a = [];
  const arr = ["starWars", "consolas", "diversos"];

  for (let i = 0; i < arr.length; i++) {
    try {
      const response = await fetch(`http://localhost:3000/${arr[i]}`);
      const result = await response.json();

      if (response.ok) {
        a.push({ arr: result, id: arr[i] });
      } else {
        alert("Ha ocurrido un error");
      }
    } catch (error) {
      alert("A habido un error en la pagina");
    }
  }

  return a;
}

export async function getProduct(id, name) {
  try {
    const response = await fetch(`http://localhost:3000/${name}/${id}`);
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      alert("Ha ocurrido un error");
      return result;
    }
  } catch (error) {
    console.log(error);
    alert("error al obtener el producto");
  }
}

export function newMessage(mensaje) {
  return fetch("http://localhost:3000/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mensaje),
  }).catch((error) => {
    console.log(error);
    alert("Error al enviar el mensaje");
  });
}

export const agregarProducto = (categoria, data) => {
  return fetch(`http://localhost:3000/${categoria}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export async function modify(id, name, data) {
  try {
    const response = await fetch(`http://localhost:3000/${name}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id, name) {
  try {
    const response = await fetch(`http://localhost:3000/${name}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    alert("Ha ocurrido un error");
  }
  return false;
}

export async function peticionUsers() {
  try {
    const response = await fetch("http://localhost:3000/users");
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      alert("Ha ocurrido un Error");
      return [];
    }
  } catch (error) {
    alert("Ha ocurrido un Error");
    console.log(error);
    return [];
  }
}
