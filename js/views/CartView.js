function renderCartView() {
    var allProducts = productModel.getAllProducts();
    var cartData = cartModel.calculateTotal(allProducts);
    var currentUser = userModel.getCurrentUser();
    
    var main = document.getElementById('app-main');
    
    if (cartData.items.length === 0) {
        main.innerHTML = 
            <div style="max-width:800px; margin:2rem auto; text-align:center; padding:3rem; background:var(--card); border-radius:1rem;">
                <i class="fas fa-shopping-cart" style="font-size:4rem; color:var(--text-light); margin-bottom:1rem;"></i>
                <h2>Tu carrito está vacío</h2>
                <p style="margin:1rem 0;">Explora nuestro catálogo y agrega productos</p>
                <button class="btn btn-primary" onclick="currentPage='catalog'; renderCurrentPage(); renderHeader();">Ver Catálogo</button>
            </div>
        ;
        return;
    }
    
    main.innerHTML = 
        <div style="max-width:1200px; margin:0 auto; padding:2rem;">
            <h2 style="margin-bottom:2rem;">Mi Carrito</h2>
            <div style="display:grid; grid-template-columns:1fr 350px; gap:2rem;">
                <div id="cartItemsContainer"></div>
                <div style="background:var(--card); padding:1.5rem; border-radius:1rem; height:fit-content;">
                    <h3>Resumen de compra</h3>
                    <div style="margin:1rem 0;">
                        <p style="display:flex; justify-content:space-between;"><span>Subtotal:</span><span id="cartSubtotal"></span></p>
                        <p style="display:flex; justify-content:space-between;"><span>IVA (16%):</span><span id="cartTax"></span></p>
                        <hr style="margin:0.5rem 0;">
                        <p style="display:flex; justify-content:space-between; font-size:1.25rem; font-weight:bold;"><span>Total:</span><span id="cartTotal"></span></p>
                    </div>
                    <button class="btn btn-primary" style="width:100%;" onclick="proceedToCheckout()" >
                        
                    </button>
                    <button class="btn btn-outline" style="width:100%; margin-top:1rem;" onclick="clearCart()">Vaciar carrito</button>
                </div>
            </div>
        </div>
    ;
    
    var container = document.getElementById('cartItemsContainer');
    if (container) {
        container.innerHTML = cartData.items.map(function(item) {
            return 
                <div class="cart-item">
                    <div style="display:flex; gap:1rem; align-items:center; flex:1;">
                        <img src="" style="width:80px; height:80px; object-fit:contain;">
                        <div>
                            <h4></h4>
                            <p class="product-price"></p>
                        </div>
                    </div>
                    <div class="cart-item-actions">
                        <button class="btn" style="padding:0.25rem 0.75rem;" onclick="updateCartQuantity(, )">-</button>
                        <span style="min-width:40px; text-align:center;"></span>
                        <button class="btn" style="padding:0.25rem 0.75rem;" onclick="updateCartQuantity(, )">+</button>
                        <button class="btn btn-danger" style="padding:0.25rem 0.75rem;" onclick="removeFromCart()">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            ;
        }).join('');
    }
}

function proceedToCheckout() {
    if (userModel.getCurrentUser()) {
        currentPage = 'checkout';
        renderCurrentPage();
        renderHeader();
    } else {
        Helpers.showNotification('Debes iniciar sesión para continuar', 'warning');
        currentPage = 'login';
        renderCurrentPage();
        renderHeader();
    }
}

function clearCart() {
    if (confirm('Vaciar todo el carrito?')) {
        cartModel.clearCart();
        if (window.updateCartCount) window.updateCartCount();
        renderCurrentPage();
        Helpers.showNotification('Carrito vaciado', 'success');
    }
}

function updateCartQuantity(productId, quantity) {
    cartModel.updateQuantity(productId, quantity);
    if (window.updateCartCount) window.updateCartCount();
    renderCurrentPage();
}

function removeFromCart(productId) {
    cartModel.removeItem(productId);
    if (window.updateCartCount) window.updateCartCount();
    renderCurrentPage();
    Helpers.showNotification('Producto eliminado', 'success');
}
