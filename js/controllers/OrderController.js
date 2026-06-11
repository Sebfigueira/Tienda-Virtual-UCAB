class OrderController {
    constructor(orderModel, cartModel, productModel) {
        this.orderModel = orderModel;
        this.cartModel = cartModel;
        this.productModel = productModel;
    }
    createOrderFromCart(userId, userName, userEmail) {
        var products = this.productModel.getAllProducts();
        var cartData = this.cartModel.calculateTotal(products);
        if (cartData.items.length === 0) {
            Helpers.showNotification('El carrito está vacío', 'warning');
            return null;
        }
        var order = this.orderModel.createOrder({
            userId: userId,
            userName: userName,
            userEmail: userEmail,
            items: cartData.items.map(function(item) {
                return {
                    productId: item.productId,
                    productName: item.product.title,
                    quantity: item.quantity,
                    price: item.product.price,
                    itemTotal: item.itemTotal
                };
            }),
            subtotal: cartData.subtotal,
            tax: cartData.tax,
            total: cartData.total
        });
        this.cartModel.clearCart();
        if (window.updateCartCount) window.updateCartCount();
        Helpers.showNotification('Orden creada exitosamente', 'success');
        return order;
    }
    getUserOrders(userId) {
        return this.orderModel.getOrdersByUser(userId);
    }
    getAllOrders() {
        return this.orderModel.getAllOrders();
    }
    updateOrderStatus(orderId, status) {
        var order = this.orderModel.updateOrderStatus(orderId, status);
        if (order) {
            Helpers.showNotification('Estado actualizado', 'success');
        }
        return order;
    }
    getSalesMetrics() {
        return this.orderModel.getSalesMetrics();
    }
}
