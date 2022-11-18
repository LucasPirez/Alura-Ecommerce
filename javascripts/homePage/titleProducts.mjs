export function createHeader(title) {
  const divTitle = document.createElement("div");
  const h2Title = document.createElement("h2");
  const aTitle = document.createElement("a");

  divTitle.classList.add("products__container__title");
  divTitle.setAttribute("data-product-title", `${title}`);

  h2Title.textContent = `${title}`;
  h2Title.classList.add("products__title");
  aTitle.classList.add("products__verTodo");
  aTitle.href = "#/allProducts";
  aTitle.innerHTML = `
  Ver Todo
   <svg
  width="11"
                height="11"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M-0.000243529 9L12.1698 9L6.57976 14.59L7.99976 16L15.9998 8L7.99976 -6.99382e-07L6.58976 1.41L12.1698 7L-0.000243354 7L-0.000243529 9Z"
                  fill="#2A7AE4"
                />
                </svg>`;

  divTitle.append(h2Title, aTitle);

  return divTitle;
}
