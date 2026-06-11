class CartController {
    constructor(cartModel, productModel) {
        this.cartModel = cartModel;
        this.productModel = productModel;
    }
    addToCart(productId, quantity) {
        quantity = quantity || 1;
        var result = this.cartModel.addItem(productId, quantity);
        Helpers.showNotification('Producto agregado al carrito', 'success');
        if (window.updateCartCount) window.updateCartCount();
        return result;
    }
    removeFromCart(productId) {
        var result = this.cartModel.removeItem(productId);
        if (window.updateCartCount) window.updateCartCount();
        if (window.renderCurrentPage) window.renderCurrentPage();
        return result;
    }
    updateQuantity(productId, quantity) {
        var result = this.cartModel.updateQuantity(productId, quantity);
        if (window.updateCartCount) window.updateCartCount();
        if (window.renderCurrentPage) window.renderCurrentPage();
        return result;
    }
    clearCart() {
        var result = this.cartModel.clearCart();
        if (window.updateCartCount) window.updateCartCount();
        if (window.renderCurrentPage) window.renderCurrentPage();
        return result;
    }
    getCartDetails() {
        var products = this.productModel.getAllProducts();
        return this.cartModel.calculateTotal(products);
    }
    getCartSummary() {
        return this.cartModel.getCartSummary();
    }
}
