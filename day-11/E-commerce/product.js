const productDetails =
  document.getElementById("productDetails");

const productId =
  localStorage.getItem("productId");

async function getProduct() {

  const res = await fetch(
    `https://fakestoreapi.com/products/${productId}`
  );

  const product = await res.json();

  productDetails.innerHTML = `

    <div class="bg-white p-8 rounded-xl shadow-lg grid md:grid-cols-2 gap-8">

      <img
        src="${product.image}"
        class="h-96 object-contain w-full"
      >

      <div>

        <h1 class="text-4xl font-bold">
          ${product.title}
        </h1>

        <p class="mt-4 text-gray-500">
          ${product.description}
        </p>

        <p class="text-3xl text-green-600 font-bold mt-6">
          $${product.price}
        </p>

        <button
          onclick="addToCart()"
          class="bg-black text-white px-6 py-3 rounded mt-6"
        >
          Add To Cart
        </button>

      </div>

    </div>

  `;
}

getProduct();

function addToCart() {

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  fetch(
    `https://fakestoreapi.com/products/${productId}`
  )
    .then((res) => res.json())
    .then((product) => {

      const existingProduct =
        cart.find(
          (item) => item.id === product.id
        );

      if (existingProduct) {

        existingProduct.quantity += 1;

      } else {

        cart.push({
          ...product,
          quantity: 1,
        });
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

      alert("Added To Cart");
    });
}