import { CartModel } from '../models/CartModel.js';
export const cartController = {
    model: new CartModel(),
    handleAddToCart(product) {
        this.model.addToCart(product);
        alert(`¡${product.title.substring(0, 20)}... añadido al carrito!`);
    }
};
