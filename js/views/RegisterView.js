function renderRegisterView() {
    var main = document.getElementById('app-main');
    main.innerHTML = 
        <div style="max-width:500px; margin:2rem auto;">
            <div style="background:var(--card); padding:2rem; border-radius:1rem;">
                <h2 style="text-align:center; margin-bottom:2rem;">Crear Cuenta</h2>
                <form id="registerForm">
                    <div class="form-group">
                        <label>Nombre completo</label>
                        <input type="text" id="regName" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="regEmail" required>
                    </div>
                    <div class="form-group">
                        <label>Contraseña</label>
                        <input type="password" id="regPassword" required minlength="6">
                    </div>
                    <div class="form-group">
                        <label>Confirmar contraseña</label>
                        <input type="password" id="regConfirmPassword" required>
                    </div>
                    <div class="form-group">
                        <label>Dirección (opcional)</label>
                        <input type="text" id="regAddress" placeholder="Tu dirección">
                    </div>
                    <button type="submit" class="btn btn-primary" style="width:100%;">Registrarse</button>
                </form>
                <p style="text-align:center; margin-top:1rem;">
                    ¿Ya tienes cuenta? <a href="#" onclick="currentPage='login'; renderCurrentPage(); renderHeader();">Inicia sesión</a>
                </p>
            </div>
        </div>
    ;
    
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var password = document.getElementById('regPassword').value;
        var confirm = document.getElementById('regConfirmPassword').value;
        
        if (password !== confirm) {
            Helpers.showNotification('Las contraseñas no coinciden', 'error');
            return;
        }
        
        var result = userModel.register({
            name: document.getElementById('regName').value,
            email: document.getElementById('regEmail').value,
            password: password,
            address: document.getElementById('regAddress').value
        });
        
        if (result.success) {
            Helpers.showNotification('Registro exitoso! Ahora inicia sesión', 'success');
            currentPage = 'login';
            renderCurrentPage();
            renderHeader();
        } else {
            Helpers.showNotification(result.error, 'error');
        }
    });
}
