function renderProfileView() {
    var currentUser = userModel.getCurrentUser();
    if (!currentUser) {
        currentPage = 'login';
        renderCurrentPage();
        renderHeader();
        return;
    }
    
    var userOrders = orderModel.getOrdersByUser(currentUser.id);
    
    var main = document.getElementById('app-main');
    main.innerHTML = 
        <div style="max-width:600px; margin:0 auto; padding:2rem;">
            <div style="background:var(--card); padding:2rem; border-radius:1rem;">
                <div style="text-align:center;">
                    <img src="" style="width:100px; height:100px; border-radius:50%; margin-bottom:1rem;">
                    <h2></h2>
                    <p></p>
                    <p><i class="fas fa-map-marker-alt"></i> </p>
                </div>
                <hr style="margin:1.5rem 0;">
                <h3>Editar perfil</h3>
                <form id="profileForm">
                    <div class="form-group">
                        <label>Nombre</label>
                        <input type="text" id="editName" value="" required>
                    </div>
                    <div class="form-group">
                        <label>Avatar URL</label>
                        <input type="text" id="editAvatar" value="">
                    </div>
                    <div class="form-group">
                        <label>Dirección</label>
                        <input type="text" id="editAddress" value="">
                    </div>
                    <button type="submit" class="btn btn-primary">Actualizar perfil</button>
                </form>
                
                <hr style="margin:1.5rem 0;">
                <h3>Mis órdenes</h3>
                <div id="userOrders"></div>
            </div>
        </div>
    ;
    
    var ordersContainer = document.getElementById('userOrders');
    if (userOrders.length === 0) {
        ordersContainer.innerHTML = '<p>No tienes órdenes aún</p>';
    } else {
        ordersContainer.innerHTML = userOrders.map(function(order) {
            return 
                <div style="border:1px solid var(--border); padding:1rem; border-radius:0.5rem; margin-bottom:1rem;">
                    <p><strong>Orden:</strong> </p>
                    <p><strong>Total:</strong> </p>
                    <p><strong>Estado:</strong> <span style="background:var(--warning); padding:0.25rem 0.5rem; border-radius:0.25rem;"></span></p>
                    <p><strong>Fecha:</strong> </p>
                </div>
            ;
        }).join('');
    }
    
    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        userModel.updateProfile(currentUser.id, {
            name: document.getElementById('editName').value,
            avatar: document.getElementById('editAvatar').value,
            address: document.getElementById('editAddress').value
        });
        Helpers.showNotification('Perfil actualizado', 'success');
        renderProfileView();
        renderHeader();
    });
}
