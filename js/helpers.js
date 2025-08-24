// LocalStorage'a kayıt yapacak fonksiyon
const saveToLocale = (key, data) => {
  
  localStorage.setItem(key, JSON.stringify(data));
};

// LocaleStorage'dan kayıtlı verileri alacak fonksiyon
const getFromLocale = (key) => {


  return JSON.parse(localStorage.getItem(key)) || [];
};

// Sepetteki toplam ürün miktarını hesaplayan fonksiyon
const calculateTotalQuantity = (cart) => {



  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  // ? reduce metodu nasıl çalıştı ?

  return totalQuantity;
};

// Sepetteki ürünlerin toplam fiyatını hesaplayacak fonksiyon
const calculateTotalPrice = (cart) => {


  // sepetteki tüm ürünlerin toplam fiyatını hesapla
  const cartItemsAmount = cart.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  // Sepet toplamı için bir değişken oluştur
  let totalAmount;

  // Eğer sepetteki ürünlerin toplam fiyatı 500$'ın altındaysa 100$ kargo ücreti al;değilse kargo ücreti alma
  if (cartItemsAmount < 500) {
    // Kargo ücreti ekle
    totalAmount = cartItemsAmount + 100;
  } else {
    // Kargo ücreti ekleme
    totalAmount = cartItemsAmount;
  }

  // Hesaplanan toplam fiyatı return et
  return totalAmount;
};

export {
  saveToLocale,
  getFromLocale,
  calculateTotalQuantity,
  calculateTotalPrice,
};