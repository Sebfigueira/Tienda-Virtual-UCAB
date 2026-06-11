function renderForgotPasswordView() {
    var main = document.getElementById('app-main');
    main.innerHTML = 
        <div style="max-width:400px; margin:2rem auto;">
            <div style="background:var(--card); padding:2rem; border-radius:1rem;">
                <h2 style="text-align:center; margin-bottom:2rem;">Recuperar contraseña</h2>
                <form id="forgotForm">
                    <div class="form-group">
                        <label>Email registrado</label>
                        <input type="email" id="resetEmail" required>
                    </div>
                    <div class="form-group">
                        <label>Nueva contraseña</label>
                        <input type="password" id="newPassword" required minlength="6">
                    </div>
                    <div class="form-group">
                        <label>Confirmar contraseña</label>
                        <input type="password" id="confirmPassword" required>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width:100%;">Restablecer</button>
                </form>
                <p style="text-align:center; margin-top:1rem;">
                    <a href="#" onclick="currentPage='login'; renderCurrentPage(); renderHeader();">Volver al login</a>
                </p>
            </div>
        </div>
    ;
    
    document.getElementById('forgotForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var email = document.getElementById('resetEmail').value;
        var newPassword = document.getElementById('newPassword').value;
        var confirm = document.getElementById('confirmPassword').value;
        
        if (newPassword !== confirm) {
            Helpers.showNotification('Las contraseñas no coinciden', 'error');
            return;
        }
        
        var result = userModel.resetPassword(email, newPassword);
        if (result.success) {
            Helpers.showNotification('Contraseña restablecida. Inicia sesión', 'success');
            currentPage = 'login';
            renderCurrentPage();
            renderHeader();
        } else {
            Helpers.showNotification(result.error, 'error');
        }
    });
}
