function renderHomeView() {
    var products = productModel.getTopProducts(4);
    var main = document.getElementById('app-main');
    
    main.innerHTML = 
        <div style="max-width:1280px; margin:0 auto;">
            <div style="background:linear-gradient(135deg, var(--primary), var(--primary-dark)); color:white; padding:4rem 2rem; border-radius:1rem; text-align:center; margin-bottom:3rem;">
                <h1 style="font-size:3rem; margin-bottom:1rem;">Bienvenido a TechStore</h1>
                <p style="font-size:1.25rem; margin-bottom:2rem;">Los mejores productos tecnológicos al mejor precio</p>
                <button class="btn" style="background:white; color:var(--primary);" onclick="currentPage='catalog'; renderCurrentPage(); renderHeader();">
                    Ver Catálogo <i class="fas fa-arrow-right"></i>
                </button>
            </div>
            
            <h2 style="text-align:center; margin-bottom:2rem;">¿Por qué elegirnos?</h2>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px,1fr)); gap:2rem; margin-bottom:3rem;">
                <div style="text-align:center; padding:1.5rem; background:var(--card); border-radius:1rem;">
                    <i class="fas fa-truck" style="font-size:3rem; color:var(--primary); margin-bottom:1rem;"></i>
                    <h3>Envío Rápido</h3>
                    <p>Entregas en 24-48 horas</p>
                </div>
                <div style="text-align:center; padding:1.5rem; background:var(--card); border-radius:1rem;">
                    <i class="fas fa-shield-alt" style="font-size:3rem; color:var(--primary); margin-bottom:1rem;"></i>
                    <h3>Garantía Total</h3>
                    <p>12 meses de garantía</p>
                </div>
                <div style="text-align:center; padding:1.5rem; background:var(--card); border-radius:1rem;">
                    <i class="fas fa-headset" style="font-size:3rem; color:var(--primary); margin-bottom:1rem;"></i>
                    <h3>Soporte 24/7</h3>
                    <p>Atención personalizada</p>
                </div>
                <div style="text-align:center; padding:1.5rem; background:var(--card); border-radius:1rem;">
                    <i class="fas fa-lock" style="font-size:3rem; color:var(--primary); margin-bottom:1rem;"></i>
                    <h3>Pago Seguro</h3>
                    <p>Transacciones protegidas</p>
                </div>
            </div>
            
            <h2 style="text-align:center; margin-bottom:2rem;">Productos Destacados</h2>
            <div class="products-grid" id="featuredProducts"></div>
            
            <div style="background:linear-gradient(135deg, var(--dark), var(--light)); padding:3rem; border-radius:1rem; text-align:center; margin:3rem 0;">
                <h2 style="margin-bottom:1rem;">Suscríbete a nuestro newsletter</h2>
                <p style="margin-bottom:1.5rem;">Recibe ofertas exclusivas y novedades</p>
                <form id="newsletterForm" style="display:flex; gap:1rem; max-width:500px; margin:0 auto; flex-wrap:wrap;">
                    <input type="email" placeholder="Tu correo electrónico" style="flex:1; padding:0.75rem; border-radius:0.5rem; border:1px solid var(--border); background:var(--card);" required>
                    <button type="submit" class="btn btn-primary">Suscribirse</button>
                </form>
            </div>
        </div>
    ;
    
    var container = document.getElementById('featuredProducts');
    if (container) {
        container.innerHTML = products.map(function(p) {
            return 
                <div class="product-card">
                    <img src="" class="product-image" onerror="this.src='https://via.placeholder.com/200'">
                    <div class="product-info">
                        <h3 class="product-title"></h3>
                        <p class="product-price"></p>
                        <div class="product-actions">
                            <button class="btn btn-primary" onclick="viewProduct()">Ver detalles</button>
                            <button class="btn btn-secondary" onclick="addToCart()">Agregar</button>
                        </div>
                    </div>
                </div>
            ;
        }).join('');
    }
    
    var newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var email = e.target.querySelector('input').value;
            Helpers.showNotification('Gracias por suscribirte ' + email, 'success');
            e.target.reset();
        });
    }
}
