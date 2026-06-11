class ApiService {
    static async fetchProducts() {
        try {
            var response = await fetch(APP_CONFIG.API_URL + '/products');
            if (!response.ok) throw new Error('Error fetching products');
            var products = await response.json();
            return products.map(function(p) {
                return {
                    id: p.id,
                    title: p.title,
                    price: p.price,
                    description: p.description,
                    category: p.category,
                    image: p.image,
                    rating: p.rating ? p.rating.rate : 0,
                    stock: 10
                };
            });
        } catch (error) {
            console.error('API Error:', error);
            return null;
        }
    }
}
