import { getFromLocale, saveToLocale } from "./helpers.js";
import {
  renderCartItems,
  renderCartQuantity,
  renderCartTotal,
  renderNotFound,
} from "./ui.js";

// LocaleStorage'dan sepete eklenen ürünleri al
let cart = getFromLocale("cart");

// Sepete ürün ekleyecek fonksiyon
const addToCart = (e, products) => {
  // Bu fonksiyondan beklentimiz ne? İlk olarak sepete eklemek istediğimiz ürünü tespit etsin sonrasında bu ürünün sepette olup olmadığını kontrol etsin.Eğer ürün sepette varsa o ürünün miktarını bir arttırsın eğer ürün sepete ilk defa eklenecekse ürünü sepete eklesin.Sepete eklenen ürünler sayfa yenilendiğinde kapbolmasın diye localStorage'da eklenen ürünleri tutsun.

  // Sepete eklenen ürünü tespit edebilmek için hangi elemana tıklandığını tespit et ve bu elemana eklenen id değerine eriş
  const productId = +e.target.dataset.id;

  // products dizisi içerisinde id'si productId'ye eşit olan elemanı bul
  const foundedProduct = products.find((product) => product.id === productId);

  // Sepete eklenecek ürün öncesinde sepete eklendi mi? Eğer ürün öncesinde sepete eklendiyse yeniden ekleme sadece miktarını bir arttır.Ama ürün öncesinde sepete eklenmediyse bu ürünün verileri üzerine quantity değeri ekleyerek  sıfırdan sepete ekleme işlemi yap.

  const exitingProduct = cart.find((item) => item.id === productId);

  if (exitingProduct) {
    // Eğer sepete eklenecek ürün önceden eklendiyse miktarını bir arttır
    exitingProduct.quantity++;
  } else {
    // Eğer sepete eklenecek ürün önceden eklenmediyse sepete eklenecek ürün için bir ürün objesi oluştur
    const cartItem = {
       
      ...foundedProduct,
      quantity: 1,
    };

    // Sepete eklenecek olan ürünü cart dizisine ekle
    cart.push(cartItem);
  }

  // Sepet dizisini localeStorage'a kayıt et
  saveToLocale("cart", cart);

  
  e.target.textContent = "Added";

  
  setTimeout(() => {
    e.target.textContent = "Add to cart";
  }, 2000);

  //  Header içerisindeki sepet ikonunun yanındaki miktar değerini güncelle
  renderCartQuantity(cart);
};

// Sepetten eleman kaldıracak fonksiyon
const removeFromCart = (e) => {

  const response = confirm("Do you confirm to delete this product?");


  if (response) {
    // Tıklanılan elemanın id'sine eriş ve id'yi number tipine çevir
    const productId = Number(e.target.dataset.id);

    // Id'si bilinen ürünü sepetten kaldır
    cart = cart.filter((item) => item.id !== productId);

    // Güncel sepete göre localeStorage'ı güncelle
    saveToLocale("cart", cart);
  
    renderCartTotal(cart);

    
    if (cart.length > 0) {
      renderCartItems(cart);
    } else {
      renderNotFound();
    }
  }

  //  Header içerisindeki sepet ikonunun yanındaki miktar değerini güncelle
  renderCartQuantity(cart);
};

// Sepetteki ürünün miktarını güncelleyen fonksiyon
const onQuantityChange = (e) => {
 
  // Güncellenecek elemanın id'sine eriş
  const productId = parseInt(e.target.dataset.id);


  const newQuantity = parseInt(e.target.value);

 
  if (newQuantity > 0) {

    // Güncellenecek elemanı dizi içerisinde bul
    const updateItem = cart.find((item) => item.id === productId);

    // Bulunan ürünün değerini güncelle
    updateItem.quantity = newQuantity;

    // Güncel sepet dizisini localStorage'a aktar
    saveToLocale("cart", cart);

  
    renderCartTotal(cart);

   
    renderCartQuantity(cart);
  } else {
   
    alert("Plase enter a value grater than 0");

    // Fonksiyonu durdur
    return;
  }
};

export { addToCart, removeFromCart, onQuantityChange };