
import fetchProducts from "./api.js";
import { addToCart } from "./cart.js";
import { getFromLocale } from "./helpers.js";
import {
  renderCartItems,
  renderCartQuantity,
  renderCartTotal,
  renderNotFound,
  renderProduct,
  uiElements,
} from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
  
  uiElements.menuBtn.addEventListener("click", () => {
    
    uiElements.nav.classList.toggle("open");
  });

  // LocaleStorage'dan sepete eklenen ürünleri al
  let cart = getFromLocale("cart");

  // * Header içerisindeki sepet ikonunun yanındaki miktar değerini güncelle
  renderCartQuantity(cart);

  // Hangi sayfadayız? Eğer ana sayfadaysak api'dan ürünleri al ve arayüzde render et; eğer sepet sayfasındaysak bu durumdada sepete eklenen ürünleri render et
  if (window.location.pathname.includes("/index.html")) {
    // Api'dan ürünleri aldıktan sonra her bir ürün elemanı için arayüze bir html render et

    // Api'dan verileri al
    const products = await fetchProducts();

    // Alınan ürünleri render etme
    renderProduct(products, (e) => {
      addToCart(e, products);
    });
  } else {
    // Sepette ürün yoksa not-found içeriğini renderla,sepette ürünler varsa bu ürünleri renderla
    if (cart.length > 0) {
      renderCartItems(cart);

      // Sepetteki ürünlerin toplam fiyatını renderla
      renderCartTotal(cart);
    } else {
      renderNotFound();
    }
  }
});

