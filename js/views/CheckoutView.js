function renderCheckoutView() {
    var currentUser = userModel.getCurrentUser();
    if (!currentUser) {
        currentPage = 'login';
        renderCurrentPage();
        renderHeader();
        return;
    }
    
    var allProducts = productModel.getAllProducts();
    var cartData = cartModel.calculateTotal(allProducts);
    
    if (cartData.items.length === 0) {
        currentPage = 'cart';
        renderCurrentPage();
        renderHeader();
        return;
    }
    
    var main = document.getElementById('app-main');
    main.innerHTML = 
        <div style="max-width:800px; margin:0 auto; padding:2rem;">
            <h2 style="margin-bottom:2rem;">Finalizar compra</h2>
            <div style="display:grid; gap:2rem;">
                <div style="background:var(--card); padding:1.5rem; border-radius:1rem;">
                    <h3>Datos de envío</h3>
                    <p><strong></strong></p>
                    <p></p>
                    <p></p>
                </div>
                
                <div style="background:var(--card); padding:1.5rem; border-radius:1rem;">
                    <h3>Resumen del pedido</h3>
                    <div id="orderSummary"></div>
                    <hr>
                    <div style="display:flex; justify-content:space-between; font-weight:bold;">
                        <span>Total</span>
                        <span id="totalAmount"></span>
                    </div>
                </div>
                
                <div style="background:var(--card); padding:1.5rem; border-radius:1rem;">
                    <h3>Datos de pago (Demo)</h3>
                    <form id="paymentForm">
                        <div class="form-group">
                            <label>Número de tarjeta</label>
                            <input type="text" placeholder="4242 4242 4242 4242" required>
                        </div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                            <div class="form-group">
                                <label>Fecha expiración</label>
                                <input type="text" placeholder="MM/AA" required>
                            </div>
                            <div class="form-group">
                                <label>CVV</label>
                                <input type="text" placeholder="123" required>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width:100%;">Pagar </button>
                    </form>
                </div>
            </div>
        </div>
    ;
    
    var summaryContainer = document.getElementById('orderSummary');
    summaryContainer.innerHTML = cartData.items.map(function(item) {
        return 
            <div style="display:flex; justify-content:space-between; margin:0.5rem 0;">
                <span> x</span>
                <span></span>
            </div>
        ;
    }).join('');
    
    document.getElementById('paymentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        var order = orderModel.createOrder({
            userId: currentUser.id,
            userName: currentUser.name,
            userEmail: currentUser.email,
            items: cartData.items.map(function(item) {
                return {
                    productId: item.productId,
                    productName: item.product.title,
                    quantity: item.quantity,
                    price: item.product.price,
                    itemTotal: item.itemTotal
                };
            }),
            subtotal: cartData.subtotal,
            tax: cartData.tax,
            total: cartData.total
        });
        
        cartModel.clearCart();
        if (window.updateCartCount) window.updateCartCount();
        Helpers.showNotification('Compra realizada con éxito', 'success');
        currentPage = 'home';
        renderCurrentPage();
        renderHeader();
    });
}
