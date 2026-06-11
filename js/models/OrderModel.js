class OrderModel {
    constructor() {
        this.orders = StorageService.get(APP_CONFIG.STORAGE_KEYS.ORDERS, []);
    }
    saveOrders() { StorageService.set(APP_CONFIG.STORAGE_KEYS.ORDERS, this.orders); }
    createOrder(orderData) {
        var newOrder = {
            id: 'ORD-' + Date.now(),
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        for (var key in orderData) { newOrder[key] = orderData[key]; }
        this.orders.push(newOrder);
        this.saveOrders();
        return newOrder;
    }
    getAllOrders() { return this.orders; }
    getOrdersByUser(userId) {
        return this.orders.filter(function(o) { return o.userId === userId; });
    }
    getOrderById(id) {
        return this.orders.find(function(o) { return o.id === id; });
    }
    updateOrderStatus(orderId, status) {
        var order = this.orders.find(function(o) { return o.id === orderId; });
        if (order) {
            order.status = status;
            order.updatedAt = new Date().toISOString();
            this.saveOrders();
            return order;
        }
        return null;
    }
    getSalesMetrics() {
        var completed = this.orders.filter(function(o) { return o.status === 'delivered'; });
        var totalRevenue = 0;
        for (var i = 0; i < completed.length; i++) {
            totalRevenue += completed[i].total;
        }
        var productSales = {};
        for (var i = 0; i < this.orders.length; i++) {
            var order = this.orders[i];
            for (var j = 0; j < order.items.length; j++) {
                var item = order.items[j];
                if (!productSales[item.productId]) {
                    productSales[item.productId] = { productId: item.productId, productName: item.productName, quantity: 0 };
                }
                productSales[item.productId].quantity += item.quantity;
            }
        }
        var topProducts = Object.values(productSales);
        topProducts.sort(function(a, b) { return b.quantity - a.quantity; });
        topProducts = topProducts.slice(0, 3);
        return { totalRevenue: totalRevenue, totalOrders: this.orders.length, completedOrders: completed.length, topProducts: topProducts };
    }
}
