`// import { menuArray } from "./data.js";

// const mainSection = document.querySelector(".main-section");
// let newItem = menuArray
//   .map(
//     (item) => `
//   <div class="row">
//     <div class="images-change">
//       <img class="items-img" src="${item.image}" alt="${item.name}">
//     </div>
//     <div class="row row-item">
//       <div>
//         <h1>${item.name}</h1>
//         <p class="item-ingredients">${item.ingredients}</p>
//         <p class="item-price">$${item.price}</p>
//       </div>
//       <div>
//         <button data-id="${item.id}" class="add-btn"><img src="images/add-btn.png" alt="add-button"></button>
//       </div>
//     </div>
//   </div>
//   <hr>`
//   )
//   .join("");

// mainSection.innerHTML = newItem;

// const addButtons = document.querySelectorAll(".add-btn");
// addButtons.forEach((button) => {
//   button.addEventListener("click", function (e) {
//     const buttonId = Number(e.currentTarget.dataset.id);
//     let item = menuArray.find((item) => item.id === buttonId);

//     if (item) {
//       // Check if the order section already exists
//       let orderSection = document.querySelector(".order-section");

//       if (!orderSection) {
//         // Create the order section if it doesn't exist
//         orderSection = document.createElement("div");
//         orderSection.classList.add("order-section");
//         orderSection.classList.add("container");

//         orderSection.innerHTML = `
//           <h1 class="order-title">Your Order</h1>
//           <div class="order-items"></div>
//           <hr>
//           <h2 class="total-price-heading">Total Price: <span class="total-price">$0</span></h2>
//           <button class="complete-order-btn">Complete order</button>`;
//         mainSection.appendChild(orderSection);
//       }

//       const orderItems = orderSection.querySelector(".order-items");
//       const orderItem = document.createElement("div");
//       orderItem.classList.add("order-item");
//       orderItem.classList.add("row");

//       orderItem.innerHTML = `
//         <h2 class="item-name">${item.name}</h2>
//         <button class="remove-btn">Remove</button>
//         <p class="item-price">$${item.price}</p>

//         `;

//       const removeButton = orderItem.querySelector(".remove-btn");
//       removeButton.addEventListener("click", function () {
//         orderItem.remove();
//         updateTotalPrice();
//         if (orderItems.children.length === 0) {
//           orderSection.remove();
//         }
//       });

//       orderItems.appendChild(orderItem);
//       updateTotalPrice();
//     }
//   });
// });
// function updateTotalPrice() {
//   const orderItems = document.querySelectorAll(".order-item");
//   let totalPrice = 0;
//   orderItems.forEach((item) => {
//     const price = parseFloat(
//       item.querySelector("p").textContent.replace("$", "")
//     );
//     totalPrice += price;
//   });
//   document.querySelector(".total-price").textContent = `$${totalPrice}`;
// }

// const paymentModal = document.createElement("div");

// paymentModal.classList.add("payment-modal");

// paymentModal.innerHTML = `
// <h1>Enter Card Details</h1>

// <input type="text" placeholder="Enter your Name" required>
// <input type="number" placeholder="Enter Card Number" required>
// <input type="number" placeholder="Enter CVV" required>

// `;

// mainSection.append(paymentModal);
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
<div class="payment-details">
<h1 class="payment-header">Enter Card Details</h1>
<input type="text" placeholder="Enter your Name" required>
<input type="number" placeholder="Enter Card Number" required>
<input type="number" placeholder="Enter CVV" required>
<button class="pay-btn">Pay</button>
</div>
`;

mainSection.append(paymentModal);

const payButton = document.querySelector(".pay-btn");
payButton.addEventListener("click", function () {
  paymentModal.remove();
  orderSection.textContent = `Thanks,{}`;
});
`