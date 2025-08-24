// Api'dan ürün verilerini alacak fonksiyon
const fetchProducts = async () => {
  try {
    // Api isteği at
    const response = await fetch("../db.json");

    // Api'dan gelen veriyi js nesnesine çevir
    const data = await response.json();

    // Ürünleri fonksiyon çağırıldığında return et
    return data.products;
  } catch (error) {
    // Kullanıcıya hata durumunda bildirim gönder
    alert("An error occurred while retrieving products from the API!!");

    // Hata durumunda boş bir dizi return et
    return [];
  }
};

export default fetchProducts;