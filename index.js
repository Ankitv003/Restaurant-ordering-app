import { menuArray } from "./data.js";

const mainSection = document.querySelector(".main-section");
let newItem = menuArray
  .map(
    (item) => `
  <div class="row">
    <div class="images-change">
      <img class="items-img" src="${item.image}" alt="${item.name}">
    </div>
    <div class="row row-item">
      <div>
        <h1>${item.name}</h1>
        <p class="item-ingredients">${item.ingredients}</p>
        <p class="item-price">$${item.price}</p>
      </div>
      <div>
        <button data-id="${item.id}" class="add-btn"><img src="images/add-btn.png" alt="add-button"></button>
      </div>
    </div>
  </div>
  <hr>`
  )
  .join("");

mainSection.innerHTML = newItem;

const itemCounts = {}; // Object to store item counts

const addButtons = document.querySelectorAll(".add-btn");
addButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const buttonId = Number(e.currentTarget.dataset.id);
    let item = menuArray.find((item) => item.id === buttonId);

    if (item) {
      // Check if the order section already exists
      let orderSection = document.querySelector(".order-section");

      if (!orderSection) {
        // Create the order section if it doesn't exist
        orderSection = document.createElement("div");
        orderSection.classList.add("order-section");
        orderSection.classList.add("container");

        orderSection.innerHTML = `
          <h1 class="order-title">Your Order</h1>
          <div class="order-items"></div>
          <hr>
          <h2 class="total-price-heading">Total Price: <span class="total-price">$0</span></h2>
          <button class="complete-order-btn">Complete order</button>`;
        mainSection.appendChild(orderSection);

        const completeOrderButton = orderSection.querySelector(
          ".complete-order-btn"
        );
        completeOrderButton.addEventListener("click", function () {
          paymentModal.style.display = "block";
        });
      }

      const orderItems = orderSection.querySelector(".order-items");

      if (itemCounts[buttonId]) {
        // Increment the count if the item already exists
        itemCounts[buttonId]++;
        const orderItem = orderItems.querySelector(
          `.order-item[data-id="${buttonId}"]`
        );
        const itemCount = orderItem.querySelector(".item-count");
        itemCount.textContent = itemCounts[buttonId];
      } else {
        // Create a new entry if the item doesn't exist
        itemCounts[buttonId] = 1;
        const orderItem = document.createElement("div");
        orderItem.classList.add("order-item");
        orderItem.classList.add("row");
        orderItem.dataset.id = buttonId;

        orderItem.innerHTML = `
          <h2 class="item-name">${item.name}</h2>
          <button class="remove-btn">Remove</button> 
          <div class="quantity-controls">
            <button class="decrease-btn">-</button>
            <span class="item-count">1</span>
            <button class="increase-btn">+</button>
          </div>
          <p class="item-price">$${item.price}</p>
        `;

        const decreaseButton = orderItem.querySelector(".decrease-btn");
        const increaseButton = orderItem.querySelector(".increase-btn");

        decreaseButton.addEventListener("click", function () {
          if (itemCounts[buttonId] > 1) {
            itemCounts[buttonId]--;
            const itemCount = orderItem.querySelector(".item-count");
            itemCount.textContent = itemCounts[buttonId];
            updateTotalPrice();
          }
          if (itemCounts[buttonId] === 1) {
            decreaseButton.disabled = true;
          }
        });

        increaseButton.addEventListener("click", function () {
          itemCounts[buttonId]++;
          const itemCount = orderItem.querySelector(".item-count");
          itemCount.textContent = itemCounts[buttonId];
          updateTotalPrice();
          decreaseButton.disabled = false;
        });

        const removeButton = orderItem.querySelector(".remove-btn");
        removeButton.addEventListener("click", function () {
          delete itemCounts[buttonId];
          orderItem.remove();
          if (orderItems.children.length === 0) {
            orderSection.remove();
          }
          updateTotalPrice();
        });

        orderItems.appendChild(orderItem);
      }
      updateTotalPrice();
    }
  });
});

function updateTotalPrice() {
  const orderItems = document.querySelectorAll(".order-item");
  let totalPrice = 0;
  orderItems.forEach((item) => {
    const itemCount = Number(item.querySelector(".item-count").textContent);
    const price = parseFloat(
      item.querySelector(".item-price").textContent.replace("$", "")
    );
    totalPrice += price * itemCount;
  });
  document.querySelector(".total-price").textContent = `$${totalPrice}`;
}

const paymentModal = document.createElement("div");

paymentModal.classList.add("payment-modal");

paymentModal.innerHTML = `
  <form class="payment-details">
    <h1 class="payment-header">Enter Card Details</h1>
    <input type="text" name="name" placeholder="Enter your Name" pattern="[A-Za-z\\s]+" title="Only alphabetic characters and spaces are allowed" required>
    <input type="text" name="card" placeholder="Enter Card Number (16 digits)" pattern="\\d{16}" title="Card number must be exactly 16 digits" required>
    <input type="text" name="cvv" placeholder="Enter CVV (3 digits)" pattern="\\d{3}" title="CVV must be exactly 3 digits" required>
    <button type="submit" class="pay-btn">Pay</button>
  </form>
`;

mainSection.append(paymentModal);

const paymentForm = paymentModal.querySelector(".payment-details");
paymentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  paymentModal.style.display = "none";
  const name = paymentForm.querySelector('input[name="name"]').value;
  const orderSection = document.querySelector(".order-section");
  orderSection.innerHTML = `<p class="order-complete-message">Thanks, ${name}. Your order is on it's way!</p>`;
});
