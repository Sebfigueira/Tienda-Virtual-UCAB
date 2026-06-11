import { ProductModel } from './models/ProductModel.js';
import { CartModel } from './models/CartModel.js';
import { UserModel } from './models/UserModel.js';
import { ProductView } from './views/ProductView.js';

const pM = new ProductModel(), cM = new CartModel(), uM = new UserModel(), pV = new ProductView();

window.add = (id, title, price) => { cM.addToCart({id, title, price}); alert('Añadido'); };
window.showCart = () => {
    const items = cM.getCart();
    document.getElementById('app').innerHTML = <h2>Carrito</h2> + items.map(i => <p> <button onclick='window.del()'>X</button></p>).join('') + <button onclick='window.checkout()'>Pagar</button>;
};
window.del = (id) => { cM.removeFromCart(id); window.showCart(); };
window.checkout = () => {
    if (!uM.currentUser) {
        const e = prompt("Inicia sesión (email):");
        const p = prompt("Contraseña:");
        if (uM.login(e, p)) { alert('Logueado! Pagando...'); cM.clearCart(); window.location.reload(); }
        else { alert('Credenciales inválidas o regístrate'); uM.register(e, p); }
    } else { alert('Compra exitosa!'); cM.clearCart(); window.location.reload(); }
};
window.showHome = async () => pV.render(await pM.fetchProducts());
window.showHome();
