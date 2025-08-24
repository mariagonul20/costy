import { onQuantityChange, removeFromCart } from "./cart.js";
import { calculateTotalPrice, calculateTotalQuantity } from "./helpers.js";

// Ui elemanlarını bir arada tutan obje
const uiElements = {
  menuBtn: document.querySelector("#menu-btn"),
  nav: document.querySelector("nav"),
  productsList: document.querySelector("#products-list"),
  cartItems: document.querySelector(".cart-items"),
  cartQuantity: document.querySelector("#basket-btn"),
  totalAmount: document.querySelector(".cart-total"),
};

// Api'dan alınan ürünler için birer html render edecek fonksiyon
const renderProduct = (products, callBackFunction) => {
  // Bu fonksiyon ürünler dizi içerisindeki her bir eleman için bir html oluştur
  const productsHtml = products
    .map(
      (product) => `  <div class="product">
         
          <img
            src="${product.image}"
            alt="${product.title}"
          />
        

          <div class="product-info">
            <h2>${product.title}</h2>

            <p>$${product.price.toFixed(2)}</p>

            <button class="add-to-cart" data-id="${
              product.id
            }"  >Add to cart</button>
          </div>
        </div>`
    )
    .join("");

  // Oluşturulan her bir html'i arayüzdeki productList elemanının içersine ekle
  uiElements.productsList.innerHTML = productsHtml;

  
  // Sepete ekle butonlarına eriş
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  // Erişilen sepete ekle butonlarına bir addEventListener ekle.addEventListener tekil elemanlara ekleneceğinden ilk olarak addToCartButtons'ı dön ve içerisindeki her bir elemaan teker teker eriş

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", callBackFunction);
  });
};

// Sepetteki ürünleri renderlayan fonksiyon
const renderCartItems = (cart) => {


  const cartItemsHtml = cart
    .map(
      (item) => `  <div class="cart-item">
          
            <img
              src="${item.image}"
              alt="cart-item-image"
            />

        
            <div class="cart-item-info">
              <h2 class="cart-item-title">${item.title}</h2>

              <input
                type="number"
                min="1"
                value="${item.quantity}"
                class="cart-item-quantity"
                data-id='${item.id}'
              />
            </div>

           
            <h3 class="cart-item-price">$ ${item.price}</h3>

     
            <button class="remove-button" data-id='${item.id}'>Remove</button>
          </div>`
    )
    .join("");

  // Oluşturulan cartHtml'i arayüze ekle
  uiElements.cartItems.innerHTML = cartItemsHtml;

  // remove-button class'ına sahip elemanlara eriş
  const removeButtons = document.querySelectorAll(".remove-button");

  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      removeFromCart(e);
    });
  });

  // cart-item-quantity class'ına sahip elemanlara eriş
  const quantityInputs = document.querySelectorAll(".cart-item-quantity");

  // quantityInputs içerisindeki herbir input'a eriş
  quantityInputs.forEach((input) => {
    // Erişilen inputlara bir olay izleyicisi ekle
    input.addEventListener("change", (e) => {
      onQuantityChange(e);
    });
  });
};

// Sepette ürün bulunmadığında not-found içeriği render eden fonksiyon
const renderNotFound = () => {
  uiElements.cartItems.innerHTML = ` 
<div class="cookieCard">
  <h1 class="cookieHeading">No items found in cart</h1>
  <p class="cookieDescription">Go to home page to add items to your cart</p>
  <div>
  <a href='../index.html' class="acceptButton">Go to home page</a>
  </div>
</div>
`;
};

// Sepetteki ürün sayısına göre sepet ikonunu güncelleyen fonksiyon
const renderCartQuantity = (cart) => {
 
  const totalQuantity = calculateTotalQuantity(cart);

  // uiElements içerisindeki cartQuantity elemanına bir attribute ata
  uiElements.cartQuantity.setAttribute("data-quantity", totalQuantity);
};

// Sepetin toplam fiyatını render edecek fonksiyon
const renderCartTotal = (cart) => {
 

  // Sepetin toplam fiyatını hesapla
  const totalCartAmount = calculateTotalPrice(cart);

  // Sepet toplamını renderla

  uiElements.totalAmount.innerText = `$ ${totalCartAmount.toFixed(2)}`;
};

export {
  uiElements,
  renderProduct,
  renderCartItems,
  renderNotFound,
  renderCartQuantity,
  renderCartTotal,
};