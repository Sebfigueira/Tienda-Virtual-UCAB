class AdminController {
    constructor(productModel, orderModel, userModel) {
        this.productModel = productModel;
        this.orderModel = orderModel;
        this.userModel = userModel;
    }
    isAdmin() {
        return this.userModel.isAdmin();
    }
    getDashboardData() {
        var metrics = this.orderModel.getSalesMetrics();
        var users = this.userModel.getAllUsers();
        var products = this.productModel.getAllProducts();
        return {
            totalRevenue: metrics.totalRevenue,
            totalOrders: metrics.totalOrders,
            totalUsers: users.length,
            totalProducts: products.length,
            topProducts: metrics.topProducts,
            recentOrders: this.orderModel.getAllOrders().slice(-5)
        };
    }
    createProduct(productData) {
        return this.productModel.createProduct(productData);
    }
    updateProduct(id, updates) {
        return this.productModel.updateProduct(id, updates);
    }
    deleteProduct(id) {
        return this.productModel.deleteProduct(id);
    }
    updateOrderStatus(orderId, status) {
        return this.orderModel.updateOrderStatus(orderId, status);
    }
    getAllOrders() {
        return this.orderModel.getAllOrders();
    }
    getAllProducts() {
        return this.productModel.getAllProducts();
    }
}
