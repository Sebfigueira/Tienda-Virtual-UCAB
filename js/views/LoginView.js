function renderLoginView() {
    var main = document.getElementById('app-main');
    main.innerHTML = 
        <div style="max-width:400px; margin:2rem auto;">
            <div style="background:var(--card); padding:2rem; border-radius:1rem;">
                <h2 style="text-align:center; margin-bottom:2rem;">Iniciar Sesión</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="loginEmail" required placeholder="admin@techstore.com">
                    </div>
                    <div class="form-group">
                        <label>Contraseña</label>
                        <input type="password" id="loginPassword" required placeholder="admin123">
                    </div>
                    <button type="submit" class="btn btn-primary" style="width:100%;">Ingresar</button>
                </form>
                <p style="text-align:center; margin-top:1rem;">
                    ¿No tienes cuenta? <a href="#" onclick="currentPage='register'; renderCurrentPage(); renderHeader();">Regístrate</a>
                </p>
                <p style="text-align:center; margin-top:0.5rem;">
                    <a href="#" onclick="currentPage='forgot-password'; renderCurrentPage(); renderHeader();">¿Olvidaste tu contraseña?</a>
                </p>
                <hr style="margin:1rem 0;">
                <div style="background:var(--light); padding:1rem; border-radius:0.5rem;">
                    <p style="font-size:0.875rem;"><strong>Demo Admin:</strong><br>Email: admin@techstore.com<br>Contraseña: admin123</p>
                </div>
            </div>
        </div>
    ;
    
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var email = document.getElementById('loginEmail').value;
        var password = document.getElementById('loginPassword').value;
        
        var result = userModel.login(email, password);
        if (result.success) {
            Helpers.showNotification('Bienvenido ' + result.user.name, 'success');
            renderHeader();
            if (userModel.isAdmin()) {
                currentPage = 'admin-dashboard';
            } else {
                currentPage = 'home';
            }
            renderCurrentPage();
        } else {
            Helpers.showNotification(result.error, 'error');
        }
    });
}
