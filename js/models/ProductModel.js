export class ProductModel {
    async fetchProducts() {
        try {
            const res = await fetch('https://fakestoreapi.com/products');
            return await res.json();
        } catch (e) { return []; }
    }
}
