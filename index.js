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

const addButtons = document.querySelectorAll(".add-btn");
addButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const buttonId = Number(e.currentTarget.dataset.id);
    let checkoutMode = document.createElement("div");
    checkoutMode.classList.add("container");
    // checkoutMode.classList.add("row");
    let item = menuArray.find((item) => item.id === buttonId);

    // checkoutMode.innerHTML = `
    //   <h1>Your Order</h1>
    //     <h2>${newElement.name}</h2>
    //     <p>$${newElement.price}</p>
    //     <button class="remove-item">remove item</button>
    //     <hr>
    //     <h2>Total Price:</h2>
    //     <button class="complete-order">Complete order</button>`;
    // mainSection.append(checkoutMode);
    if (item) {
      // Check if the order section already exists
      let orderSection = document.querySelector(".order-section");

      if (!orderSection) {
        // Create the order section if it doesn't exist
        orderSection = document.createElement("div");
        orderSection.classList.add("order-section");
        orderSection.classList.add("container");

        orderSection.innerHTML = `
          <h1>Your Order</h1>
          <div class="order-items"></div>
          <hr>
          <h2>Total Price: <span class="total-price">$0</span></h2>
          <button class="complete-order-btn">Complete order</button>`;
        mainSection.appendChild(orderSection);
      }

      const orderItems = orderSection.querySelector(".order-items");
      const orderItem = document.createElement("div");
      orderItem.classList.add("order-item");
      orderItem.classList.add("row");

      orderItem.innerHTML = `
        <h2>${item.name}</h2>
        <p>$${item.price}</p>
        <button class="remove-btn">Remove item</button>
        `;

      const removeButton = orderItem.querySelector(".remove-btn");
      removeButton.addEventListener("click", function () {
        orderItem.remove();
        updateTotalPrice();
      });

      orderItems.appendChild(orderItem);
      updateTotalPrice();
    }
  });
});
function updateTotalPrice() {
  const orderItems = document.querySelectorAll(".order-item");
  let totalPrice = 0;
  orderItems.forEach((item) => {
    const price = parseFloat(
      item.querySelector("p").textContent.replace("$", "")
    );
    totalPrice += price;
  });
  document.querySelector(".total-price").textContent = `$${totalPrice}`;
}

// import { menuArray } from "./data.js";

// const mainSection = document.querySelector(".main-section");
// let newItem = "";
// menuArray.forEach((item) => {
//   newItem += `
//     <div class="row">
//       <div class="images-change">
//         <img class="items-img" src="${item.image}" alt="${item.name}">
//       </div>
//       <div class="row row-item">
//         <div>
//           <h1>${item.name}</h1>
//           <p class="item-ingredients">${item.ingredients}</p>
//           <p class="item-price">$${item.price}</p>
//         </div>
//         <div>
//           <button class="add-btn" data-id="${item.id}"><img src="images/add-btn.png" alt="add-button"></button>
//         </div>
//       </div>
//     </div>
//     <hr>`;
// });

// mainSection.innerHTML = newItem;

// const addButtons = document.querySelectorAll(".add-btn");

// addButtons.forEach((button) => {
//   button.addEventListener("click", function () {
//     const itemId = this.getAttribute("data-id");
//     const item = menuArray.find((item) => item.id == itemId);

//     if (item) {
//       // Check if the order section already exists
//       let orderSection = document.querySelector(".order-section");

//       if (!orderSection) {
//         // Create the order section if it doesn't exist
//         orderSection = document.createElement("div");
//         orderSection.classList.add("order-section");
//         orderSection.innerHTML = `
//           <h1>Your Order</h1>
//           <div class="order-items"></div>
//           <hr>
//           <h2>Total Price: <span class="total-price">$0</span></h2>
//           <button class="complete-order-btn">Complete order</button>`;
//         mainSection.appendChild(orderSection);
//       }

//       const orderItems = orderSection.querySelector(".order-items");
//       const orderItem = document.createElement("div");
//       orderItem.classList.add("order-item");
//       orderItem.innerHTML = `
//         <h2>${item.name}</h2>
//         <p>$${item.price}</p>
//         <button class="remove-btn">Remove item</button>
//         <hr>`;

//       const removeButton = orderItem.querySelector(".remove-btn");
//       removeButton.addEventListener("click", function () {
//         orderItem.remove();
//         updateTotalPrice();
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
//   document.querySelector(".total-price").textContent = `$${totalPrice.toFixed(
//     2
//   )}`;
// }
