function renderAdminProductsView() {
    if (!userModel.isAdmin()) {
        currentPage = 'home';
        renderCurrentPage();
        renderHeader();
        return;
    }
    
    function renderProductList() {
        var products = productModel.getAllProducts();
        var container = document.getElementById('productsList');
        if (!container) return;
        
        container.innerHTML = products.map(function(p) {
            return 
                <div style="display:flex; justify-content:space-between; align-items:center; padding:1rem; border-bottom:1px solid var(--border);">
                    <div style="display:flex; gap:1rem; align-items:center;">
                        <img src="" style="width:50px; height:50px; object-fit:contain;">
                        <div>
                            <strong></strong>
                            <p> | </p>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-primary" style="padding:0.25rem 0.75rem;" onclick="editProduct()">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger" style="padding:0.25rem 0.75rem;" onclick="deleteProduct()">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            ;
        }).join('');
    }
    
    var main = document.getElementById('app-main');
    main.innerHTML = 
        <div style="max-width:1200px; margin:0 auto; padding:2rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem;">
                <h2>Gestión de Productos</h2>
                <button class="btn btn-primary" onclick="showAddProductModal()">
                    <i class="fas fa-plus"></i> Nuevo Producto
                </button>
            </div>
            <div id="productsList"></div>
        </div>
    ;
    
    renderProductList();
}

function showAddProductModal() {
    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = 
        <div class="modal-content">
            <h3>Nuevo Producto</h3>
            <form id="addProductForm">
                <div class="form-group">
                    <label>Título</label>
                    <input type="text" id="prodTitle" required>
                </div>
                <div class="form-group">
                    <label>Precio</label>
                    <input type="number" id="prodPrice" step="0.01" required>
                </div>
                <div class="form-group">
                    <label>Categoría</label>
                    <input type="text" id="prodCategory" required>
                </div>
                <div class="form-group">
                    <label>Descripción</label>
                    <textarea id="prodDescription" rows="3" required></textarea>
                </div>
                <div class="form-group">
                    <label>URL de imagen</label>
                    <input type="text" id="prodImage" value="https://via.placeholder.com/200">
                </div>
                <div style="display:flex; gap:1rem;">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                    <button type="button" class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancelar</button>
                </div>
            </form>
        </div>
    ;
    document.body.appendChild(modal);
    
    document.getElementById('addProductForm').addEventListener('submit', function(e) {
        e.preventDefault();
        productModel.createProduct({
            title: document.getElementById('prodTitle').value,
            price: parseFloat(document.getElementById('prodPrice').value),
            category: document.getElementById('prodCategory').value,
            description: document.getElementById('prodDescription').value,
            image: document.getElementById('prodImage').value
        });
        modal.remove();
        renderAdminProductsView();
        Helpers.showNotification('Producto creado', 'success');
    });
}

function editProduct(id) {
    var product = productModel.getProductById(id);
    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = 
        <div class="modal-content">
            <h3>Editar Producto</h3>
            <form id="editProductForm">
                <div class="form-group">
                    <label>Título</label>
                    <input type="text" id="prodTitle" value="" required>
                </div>
                <div class="form-group">
                    <label>Precio</label>
                    <input type="number" id="prodPrice" value="" step="0.01" required>
                </div>
                <div class="form-group">
                    <label>Categoría</label>
                    <input type="text" id="prodCategory" value="" required>
                </div>
                <div class="form-group">
                    <label>Descripción</label>
                    <textarea id="prodDescription" rows="3" required></textarea>
                </div>
                <div class="form-group">
                    <label>URL de imagen</label>
                    <input type="text" id="prodImage" value="">
                </div>
                <div style="display:flex; gap:1rem;">
                    <button type="submit" class="btn btn-primary">Actualizar</button>
                    <button type="button" class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancelar</button>
                </div>
            </form>
        </div>
    ;
    document.body.appendChild(modal);
    
    document.getElementById('editProductForm').addEventListener('submit', function(e) {
        e.preventDefault();
        productModel.updateProduct(id, {
            title: document.getElementById('prodTitle').value,
            price: parseFloat(document.getElementById('prodPrice').value),
            category: document.getElementById('prodCategory').value,
            description: document.getElementById('prodDescription').value,
            image: document.getElementById('prodImage').value
        });
        modal.remove();
        renderAdminProductsView();
        Helpers.showNotification('Producto actualizado', 'success');
    });
}

function deleteProduct(id) {
    if (confirm('Eliminar este producto?')) {
        productModel.deleteProduct(id);
        renderAdminProductsView();
        Helpers.showNotification('Producto eliminado', 'success');
    }
}
