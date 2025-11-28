const addButtons = document.querySelectorAll(".cartaddingbtn");
const cartBody = document.getElementById("cart-body");
const totalDisplay = document.getElementById("total");
let cart = [];

addButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    const parent = button.parentElement.querySelector("div");
    const serviceName = parent.querySelector(".service-name").textContent.trim();
    const priceText = parent.querySelector(".service-price").textContent.trim().replace("₹", "");
    const price = parseFloat(priceText);

    const existingItem = cart.find((item) => item.name === serviceName);
    if (existingItem) {
      // remove from cart
      cart = cart.filter((item) => item.name !== serviceName);
      button.style.backgroundColor = "";
      button.innerHTML = `<a href="">Add item <ion-icon name="add-circle-outline"></ion-icon></a>`;
    } else {
      // add to cart
      cart.push({ name: serviceName, price });
      button.style.backgroundColor = "#f38e8e";
      button.innerHTML = `<a href="">Remove item <ion-icon name="remove-circle-outline"></ion-icon></a>`;
    }

    updateCartTable();
  });
});

function updateCartTable() {
  cartBody.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>₹${item.price.toFixed(2)}</td>
    `;
    cartBody.appendChild(row);
  });
  totalDisplay.textContent = total.toFixed(2);
}





