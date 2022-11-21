export async function allProduc() {
  console.log("peticion all product");
  const a = [];
  const arr = ["starWars", "consolas", "diversos"];

  for (let i = 0; i < arr.length; i++) {
    const response = await fetch(`http://localhost:3000/${arr[i]}`);
    const result = await response.json();

    a.push({ arr: result, id: arr[i] });
  }

  return a;
}

export async function getProduct(id, name) {
  try {
    const response = await fetch(`http://localhost:3000/${name}/${id}`);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
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
    return false;
  } catch (error) {
    console.log(error);
  }
  return false;
}
