class CartModel {
    constructor() {
        this.cart = StorageService.get(APP_CONFIG.STORAGE_KEYS.CART, []);
    }
    saveCart() { StorageService.set(APP_CONFIG.STORAGE_KEYS.CART, this.cart); }
    addItem(productId, quantity) {
        quantity = quantity || 1;
        var existing = this.cart.find(function(item) { return item.productId == productId; });
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.cart.push({ id: Helpers.generateId(), productId: productId, quantity: quantity, addedAt: new Date().toISOString() });
        }
        this.saveCart();
        return this.getCartSummary();
    }
    removeItem(productId) {
        var index = this.cart.findIndex(function(item) { return item.productId == productId; });
        if (index !== -1) {
            this.cart.splice(index, 1);
            this.saveCart();
        }
        return this.getCartSummary();
    }
    updateQuantity(productId, quantity) {
        if (quantity <= 0) return this.removeItem(productId);
        var item = this.cart.find(function(item) { return item.productId == productId; });
        if (item) {
            item.quantity = quantity;
            this.saveCart();
        }
        return this.getCartSummary();
    }
    clearCart() {
        this.cart = [];
        this.saveCart();
        return this.getCartSummary();
    }
    getCartSummary() {
        var totalItems = 0;
        for (var i = 0; i < this.cart.length; i++) {
            totalItems += this.cart[i].quantity;
        }
        return { items: this.cart, totalItems: totalItems };
    }
    calculateTotal(products) {
        var subtotal = 0;
        var items = [];
        for (var i = 0; i < this.cart.length; i++) {
            var cartItem = this.cart[i];
            var product = products.find(function(p) { return p.id == cartItem.productId; });
            if (product) {
                var itemTotal = product.price * cartItem.quantity;
                subtotal += itemTotal;
                items.push({
                    id: cartItem.id,
                    productId: cartItem.productId,
                    quantity: cartItem.quantity,
                    product: product,
                    itemTotal: itemTotal
                });
            }
        }
        var tax = subtotal * 0.16;
        var total = subtotal + tax;
        return { items: items, subtotal: subtotal, tax: tax, total: total };
    }
}
