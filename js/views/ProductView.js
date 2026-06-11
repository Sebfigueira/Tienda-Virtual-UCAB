export class ProductView {
    renderProducts(products) {
        const app = document.getElementById('app');
        if (!app) return;
        app.innerHTML = `
            <main class="container">
                <h2 style="margin-bottom: 1.5rem;">Catálogo de Productos</h2>
                <div class="product-grid">
                    ${products.map(product => {
                        const safeTitle = product.title.replace(/'/g, "\\'").replace(/"/g, '&quot;');
                        return `
                        <div class="product-card">
                            <img src="${product.image}" alt="${safeTitle}">
                            <h3 class="product-title">${product.title}</h3>
                            <div class="product-price">$${product.price.toFixed(2)}</div>
                            <button onclick="window.addToCart(${product.id}, '${safeTitle}', ${product.price})">Agregar al Carrito</button>
                        </div>`;
                    }).join('')}
                </div>
                
                <h2 class="section-title">Lo que dicen nuestros clientes</h2>
                <div class="testimonials">
                    <div class="testimonial-card">"¡Excelente servicio! Los productos llegaron en perfecto estado." <br><br><strong>- María G.</strong></div>
                    <div class="testimonial-card">"La mejor tienda en línea. El soporte al cliente resolvió todo." <br><br><strong>- Carlos R.</strong></div>
                </div>

                <div class="newsletter">
                    <h2>Suscríbete a nuestro Boletín</h2>
                    <p style="margin: 1rem 0;">Recibe las mejores ofertas directamente en tu correo.</p>
                    <form onsubmit="event.preventDefault(); alert('¡Gracias por suscribirte!'); this.reset();">
                        <input type="email" placeholder="Tu correo electrónico..." required>
                        <button type="submit" style="background-color: #ff9900; color: #111;">Suscribirme</button>
                    </form>
                </div>
            </main>
        `;
    }
}
