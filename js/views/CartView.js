export class CartView {
    renderCart(cartItems, isLoggedIn) {
        const app = document.getElementById('app');
        const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        let html = `
            <main class="container">
                <h2 style="margin-bottom: 1.5rem;">Tu Carrito de Compras</h2>
                <div class="cart-list">
        `;

        if (cartItems.length === 0) {
            html += `<p style="text-align:center; font-size:1.2rem; margin:2rem 0;">Tu carrito está vacío.</p>`;
        } else {
            cartItems.forEach(item => {
                html += `
                    <div class="cart-item">
                        <div style="flex: 2;"><strong>${item.title}</strong></div>
                        <div style="flex: 1; text-align: center;">Cant: ${item.quantity}</div>
                        <div style="flex: 1; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</div>
                        <div style="flex: 1; text-align: right;">
                            <button class="btn-danger" onclick="window.removeFromCart(${item.id})">X</button>
                        </div>
                    </div>
                `;
            });
            html += `<div class="cart-total">Total a Pagar: $${total.toFixed(2)}</div>`;
            
            if (isLoggedIn) {
                html += `<div style="text-align:right; margin-top:1rem;"><button onclick="window.checkout()" style="background-color:#28a745; color:white;">Finalizar Compra</button></div>`;
            } else {
                html += `<div style="text-align:right; margin-top:1rem;"><p style="color:#dc3545; margin-bottom:10px;">Debes iniciar sesión para comprar.</p><button onclick="window.showLogin()">Ir a Iniciar Sesión</button></div>`;
            }
        }
        html += `</div></main>`;
        app.innerHTML = html;
    }
}
