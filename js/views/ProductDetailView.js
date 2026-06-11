function renderProductDetailView() {
    var product = productModel.getProductById(window.selectedProductId);
    var reviews = reviewModel.getProductReviews(product.id);
    var avgRating = reviewModel.getAverageRating(product.id);
    var currentUser = userModel.getCurrentUser();
    
    var main = document.getElementById('app-main');
    
    main.innerHTML = 
        <div style="max-width:1200px; margin:0 auto; padding:2rem;">
            <button class="btn btn-outline" onclick="currentPage='catalog'; renderCurrentPage(); renderHeader();" style="margin-bottom:2rem;">
                <i class="fas fa-arrow-left"></i> Volver al catálogo
            </button>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:3rem;">
                <div style="background:white; padding:2rem; border-radius:1rem;">
                    <img src="" style="width:100%; max-height:400px; object-fit:contain;">
                </div>
                <div>
                    <h1></h1>
                    <p class="product-category"><i class="fas fa-tag"></i> </p>
                    <div id="productRating"></div>
                    <p class="product-price" style="font-size:2rem; margin:1rem 0;"></p>
                    <p style="margin:1rem 0; line-height:1.6;"></p>
                    <div class="product-actions">
                        <button class="btn btn-primary" onclick="addToCart()">
                            <i class="fas fa-cart-plus"></i> Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
            
            <div style="margin-top:3rem;">
                <h3>Reseñas de clientes (<span id="reviewCount"></span>)</h3>
                <div id="reviewsContainer" style="margin:1rem 0;"></div>
                
                
            </div>
        </div>
    ;
    
    var ratingContainer = document.getElementById('productRating');
    if (ratingContainer) {
        ratingContainer.innerHTML = Helpers.renderStars(avgRating);
    }
    
    var reviewsContainer = document.getElementById('reviewsContainer');
    if (reviewsContainer) {
        if (reviews.length === 0) {
            reviewsContainer.innerHTML = '<p>No hay reseñas aún. Sé el primero en calificar</p>';
        } else {
            reviewsContainer.innerHTML = reviews.map(function(r) {
                return 
                    <div style="background:var(--card); padding:1rem; border-radius:0.5rem; margin-bottom:1rem;">
                        <div style="display:flex; justify-content:space-between;">
                            <strong></strong>
                            <div></div>
                        </div>
                        <p style="margin-top:0.5rem;"></p>
                        <small></small>
                    </div>
                ;
            }).join('');
        }
    }
    
    if (currentUser) {
        var starsContainer = document.getElementById('ratingStars');
        var selectedRating = 0;
        
        var starButtons = '';
        for (var i = 1; i <= 5; i++) {
            starButtons += '<i class="fas fa-star star" data-rating="' + i + '" style="font-size:2rem; cursor:pointer; color:#d1d5db;"></i>';
        }
        starsContainer.innerHTML = starButtons;
        
        var stars = document.querySelectorAll('.star');
        stars.forEach(function(star) {
            star.addEventListener('mouseenter', function(e) {
                var rating = parseInt(e.target.dataset.rating);
                stars.forEach(function(s, idx) {
                    if (idx < rating) s.style.color = '#fbbf24';
                    else s.style.color = '#d1d5db';
                });
            });
            star.addEventListener('mouseleave', function() {
                stars.forEach(function(s, idx) {
                    if (idx < selectedRating) s.style.color = '#fbbf24';
                    else s.style.color = '#d1d5db';
                });
            });
            star.addEventListener('click', function(e) {
                selectedRating = parseInt(e.target.dataset.rating);
                Helpers.showNotification('Calificación: ' + selectedRating + ' estrellas', 'success');
            });
        });
        
        document.getElementById('submitReview').addEventListener('click', function() {
            var comment = document.getElementById('reviewComment').value;
            if (selectedRating === 0) {
                Helpers.showNotification('Selecciona una calificación', 'warning');
                return;
            }
            if (!comment.trim()) {
                Helpers.showNotification('Escribe un comentario', 'warning');
                return;
            }
            
            reviewModel.addReview({
                productId: product.id,
                userId: currentUser.id,
                userName: currentUser.name,
                rating: selectedRating,
                comment: comment
            });
            
            Helpers.showNotification('Gracias por tu reseña', 'success');
            renderProductDetailView();
        });
    }
}
