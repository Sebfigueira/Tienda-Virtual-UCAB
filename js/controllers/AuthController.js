class AuthController {
    constructor(userModel) {
        this.userModel = userModel;
    }
    handleLogin(email, password) {
        var result = this.userModel.login(email, password);
        if (result.success) {
            Helpers.showNotification('Bienvenido ' + result.user.name, 'success');
            if (this.userModel.isAdmin()) {
                window.currentPage = 'admin-dashboard';
            } else {
                window.currentPage = 'home';
            }
            if (window.renderCurrentPage) window.renderCurrentPage();
            if (window.renderHeader) window.renderHeader();
        } else {
            Helpers.showNotification(result.error, 'error');
        }
        return result;
    }
    handleLogout() {
        this.userModel.logout();
        window.currentPage = 'home';
        if (window.renderCurrentPage) window.renderCurrentPage();
        if (window.renderHeader) window.renderHeader();
        Helpers.showNotification('Sesión cerrada', 'success');
    }
    handleRegister(userData) {
        var result = this.userModel.register(userData);
        if (result.success) {
            Helpers.showNotification('Registro exitoso, ahora inicia sesión', 'success');
            window.currentPage = 'login';
            if (window.renderCurrentPage) window.renderCurrentPage();
            if (window.renderHeader) window.renderHeader();
        } else {
            Helpers.showNotification(result.error, 'error');
        }
        return result;
    }
}
