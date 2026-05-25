const productContainer =
  document.getElementById("productContainer");

const searchInput =
  document.getElementById("searchInput");

const cartCount =
  document.getElementById("cartCount");

const darkBtn = document.getElementById("darkBtn");
const body = document.getElementById("body");

darkBtn.addEventListener("click", () => {
  body.classList.toggle("bg-gray-100");
  body.classList.toggle("bg-black");
  body.classList.toggle("text-white");
});

let products = [];

let cart =
  JSON.parse(localStorage.getItem("cart")) || [];

let wishlist =
  JSON.parse(localStorage.getItem("wishlist")) || [];

updateCartCount();


// Dark Mode
darkBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark");

});


// Fetch Products
async function fetchProducts() {

  const res = await fetch(
    "https://fakestoreapi.com/products"
  );

  products = await res.json();

  displayProducts(products);
}

fetchProducts();


// Display Products
function displayProducts(items) {

  productContainer.innerHTML = "";

  items.forEach((product) => {

    productContainer.innerHTML += `

      <div class="bg-white text-black rounded-xl shadow-lg p-4 hover:scale-105 transition">

        <img
          src="${product.image}"
          class="h-52 w-full object-contain"
        >

        <h2 class="font-bold text-lg mt-4 line-clamp-1">
          ${product.title}
        </h2>

        <p class="text-green-600 font-bold mt-2">
          $${product.price}
        </p>

        <div class="flex justify-between mt-4 gap-2">

          <button
            onclick="addToCart(${product.id})"
            class="bg-black text-white px-4 py-2 rounded w-full"
          >
            Add Cart
          </button>

          <button
            onclick="addToWishlist(${product.id})"
            class="bg-pink-500 text-white px-4 py-2 rounded"
          >
            ❤
          </button>

        </div>

        <button
          onclick="viewProduct(${product.id})"
          class="bg-blue-500 text-white px-4 py-2 rounded mt-3 w-full"
        >
          View Details
        </button>

      </div>

    `;
  });
}


// Search
searchInput.addEventListener("input", (e) => {

  const value =
    e.target.value.toLowerCase();

  const filteredProducts =
    products.filter((product) =>
      product.title.toLowerCase().includes(value)
    );

  displayProducts(filteredProducts);
});


// Category Filter
const categoryBtns =
  document.querySelectorAll(".categoryBtn");

categoryBtns.forEach((btn) => {

  btn.addEventListener("click", () => {

    const category =
      btn.dataset.category;

    if (category === "all") {

      displayProducts(products);

    } else {

      const filtered =
        products.filter(
          (product) =>
            product.category === category
        );

      displayProducts(filtered);
    }
  });
});


// Add To Cart
function addToCart(id) {

  const product =
    products.find((item) => item.id === id);

  const existingProduct =
    cart.find((item) => item.id === id);

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

  updateCartCount();

  Swal.fire({
    icon: "success",
    title: "Added To Cart",
    timer: 1500,
    showConfirmButton: false,
  });
}


// Wishlist
function addToWishlist(id) {

  const product =
    products.find((item) => item.id === id);

  wishlist.push(product);

  localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
  );

  Swal.fire({
    icon: "success",
    title: "Added To Wishlist",
    timer: 1500,
    showConfirmButton: false,
  });
}


// Cart Count
function updateCartCount() {

  cartCount.innerText = cart.length;
}


// Product Details
function viewProduct(id) {

  localStorage.setItem("productId", id);

  window.location.href = "product.html";
}