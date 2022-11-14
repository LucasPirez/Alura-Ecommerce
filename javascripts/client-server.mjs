export const allProduc = () => {
  console.log("allProduct");
  return fetch("http://localhost:3000/all").then((data) => data.json());
};

export function newMessage(mensaje) {
  return fetch("http://localhost:3000/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mensaje),
  });
}
