class ProductController {
    constructor(productModel, reviewModel) {
        this.productModel = productModel;
        this.reviewModel = reviewModel;
    }
    getAllProducts() {
        return this.productModel.getAllProducts();
    }
    getProductById(id) {
        return this.productModel.getProductById(id);
    }
    filterProducts(filters) {
        return this.productModel.filterProducts(filters);
    }
    getProductWithReviews(productId) {
        var product = this.productModel.getProductById(productId);
        if (!product) return null;
        var reviews = this.reviewModel.getProductReviews(productId);
        var averageRating = this.reviewModel.getAverageRating(productId);
        return { product: product, reviews: reviews, averageRating: averageRating };
    }
    createProduct(productData) {
        var newProduct = this.productModel.createProduct(productData);
        Helpers.showNotification('Producto creado', 'success');
        return newProduct;
    }
    updateProduct(id, updates) {
        var updated = this.productModel.updateProduct(id, updates);
        if (updated) {
            Helpers.showNotification('Producto actualizado', 'success');
        }
        return updated;
    }
    deleteProduct(id) {
        var deleted = this.productModel.deleteProduct(id);
        if (deleted) {
            Helpers.showNotification('Producto eliminado', 'success');
        }
        return deleted;
    }
}
