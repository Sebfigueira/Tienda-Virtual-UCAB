export class CartModel {
    constructor() { this.cart = JSON.parse(localStorage.getItem('cart')) || []; }
    addToCart(p) { this.cart.push(p); localStorage.setItem('cart', JSON.stringify(this.cart)); }
    removeFromCart(id) { this.cart = this.cart.filter(i => i.id !== id); localStorage.setItem('cart', JSON.stringify(this.cart)); }
    clearCart() { this.cart = []; localStorage.setItem('cart', JSON.stringify(this.cart)); }
    getCart() { return this.cart; }
}
