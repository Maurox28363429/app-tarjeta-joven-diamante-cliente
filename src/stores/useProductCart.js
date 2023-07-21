import { defineStore } from 'pinia';

const productCart = JSON.parse(localStorage.getItem('cart'));

export const useProductCart = defineStore('productCart', {
  state: () => ({
    cart: productCart ?? [],
  }),
  actions: {
    saveLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    setProduct(product) {
      const productExist = this.cart.findIndex(
        (productCart) => productCart.id === product.id
      );

      if (productExist !== -1) {
        this.cart[productExist].cantidad += 1;
        this.saveLocalStorage();
      } else {
        this.cart.push({ ...product, cantidad: 1 });
        this.saveLocalStorage();
      }
    },
    removeASingleProduct(id) {
      const productExist = this.cart.findIndex(
        (productCart) => productCart.id === id
      );
      const products = this.cart[productExist];

      if (productExist !== -1) {
        if (products.cantidad > 1) {
          this.cart[productExist].cantidad -= 1;
          this.saveLocalStorage();
          return;
        }
        if (products.cantidad === 1) {
          this.cart = this.cart.filter((product) => product.id !== id);
          this.saveLocalStorage();
          return;
        }
      }
      this.saveLocalStorage();
    },
    removeProduct(id) {
      this.cart = this.cart.filter((product) => product.id !== id);
      this.saveLocalStorage();
    },
    clearCart() {
      this.cart = [];
      this.saveLocalStorage();
    },
    getTotalPrice() {
      return this.cart.reduce(
        (acc, product) => acc + Number(product?.precio) * product?.cantidad,
        0
      );
    },
  },
});
