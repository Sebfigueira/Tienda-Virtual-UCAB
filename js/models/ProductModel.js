class ProductModel {
    constructor() {
        this.products = StorageService.get(APP_CONFIG.STORAGE_KEYS.PRODUCTS, []);
    }
    saveProducts() { StorageService.set(APP_CONFIG.STORAGE_KEYS.PRODUCTS, this.products); }
    async loadFromAPI() {
        var apiProducts = await ApiService.fetchProducts();
        if (apiProducts && apiProducts.length > 0) {
            this.products = apiProducts;
            this.saveProducts();
            return true;
        }
        return false;
    }
    getAllProducts() { return this.products; }
    getProductById(id) { return this.products.find(function(p) { return p.id == id; }); }
    filterProducts(filters) {
        var self = this;
        var filtered = this.products.slice();
        if (filters.category && filters.category !== 'all') {
            filtered = filtered.filter(function(p) { return p.category === filters.category; });
        }
        if (filters.search) {
            var search = filters.search.toLowerCase();
            filtered = filtered.filter(function(p) { return p.title.toLowerCase().indexOf(search) !== -1; });
        }
        if (filters.minPrice && filters.minPrice > 0) {
            filtered = filtered.filter(function(p) { return p.price >= filters.minPrice; });
        }
        if (filters.maxPrice && filters.maxPrice > 0) {
            filtered = filtered.filter(function(p) { return p.price <= filters.maxPrice; });
        }
        return filtered;
    }
    createProduct(data) {
        var newProduct = { id: Date.now(), rating: 0, stock: 10 };
        for (var key in data) { newProduct[key] = data[key]; }
        newProduct.createdAt = new Date().toISOString();
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }
    updateProduct(id, updates) {
        var index = this.products.findIndex(function(p) { return p.id == id; });
        if (index === -1) return null;
        this.products[index] = Object.assign({}, this.products[index], updates);
        this.saveProducts();
        return this.products[index];
    }
    deleteProduct(id) {
        var index = this.products.findIndex(function(p) { return p.id == id; });
        if (index === -1) return false;
        this.products.splice(index, 1);
        this.saveProducts();
        return true;
    }
    getCategories() {
        var cats = ['all'];
        for (var i = 0; i < this.products.length; i++) {
            if (cats.indexOf(this.products[i].category) === -1) {
                cats.push(this.products[i].category);
            }
        }
        return cats;
    }
    getTopProducts(limit) {
        limit = limit || 4;
        var sorted = this.products.slice();
        sorted.sort(function(a, b) { return (b.rating || 0) - (a.rating || 0); });
        return sorted.slice(0, limit);
    }
}
