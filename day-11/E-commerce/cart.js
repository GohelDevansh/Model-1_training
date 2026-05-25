const cartItems =
  document.getElementById("cartItems");

const totalPrice =
  document.getElementById("totalPrice");

let cart =
  JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {

    total += item.price * item.quantity;

    cartItems.innerHTML += `

      <div class="bg-white p-4 rounded-xl shadow mb-4 flex justify-between items-center">

        <div class="flex items-center gap-4">

          <img
            src="${item.image}"
            class="h-20 w-20 object-contain"
          >

          <div>

            <h2 class="font-bold">
              ${item.title}
            </h2>

            <p class="text-green-600">
              $${item.price}
            </p>

          </div>

        </div>

        <div class="flex items-center gap-3">

          <button
            onclick="decreaseQty(${index})"
            class="bg-gray-300 px-3 py-1 rounded"
          >
            -
          </button>

          <span>${item.quantity}</span>

          <button
            onclick="increaseQty(${index})"
            class="bg-gray-300 px-3 py-1 rounded"
          >
            +
          </button>

          <button
            onclick="removeItem(${index})"
            class="bg-red-500 text-white px-4 py-2 rounded"
          >
            Remove
          </button>

        </div>

      </div>

    `;
  });

  totalPrice.innerText = total.toFixed(2);
}

displayCart();

function increaseQty(index) {

  cart[index].quantity++;

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  displayCart();
}

function decreaseQty(index) {

  if (cart[index].quantity > 1) {

    cart[index].quantity--;

  } else {

    cart.splice(index, 1);
  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  displayCart();
}

function removeItem(index) {

  cart.splice(index, 1);

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  displayCart();
}