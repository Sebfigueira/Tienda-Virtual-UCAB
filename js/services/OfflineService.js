class OfflineService {
    constructor() {
        this.isOnline = navigator.onLine;
        this.setupListeners();
    }
    setupListeners() {
        var self = this;
        window.addEventListener('online', function() { self.handleOnline(); });
        window.addEventListener('offline', function() { self.handleOffline(); });
    }
    handleOnline() {
        this.isOnline = true;
        this.updateStatusDisplay();
        Helpers.showNotification('¡Conexión restablecida!', 'success');
    }
    handleOffline() {
        this.isOnline = false;
        this.updateStatusDisplay();
        Helpers.showNotification('Modo offline - Los cambios se guardan localmente', 'warning');
    }
    updateStatusDisplay() {
        var statusElement = document.getElementById('onlineStatus');
        if (statusElement) {
            if (this.isOnline) {
                statusElement.className = 'status online';
                statusElement.innerHTML = '<i class=\"fas fa-wifi\"></i> Online';
            } else {
                statusElement.className = 'status offline';
                statusElement.innerHTML = '<i class=\"fas fa-wifi-slash\"></i> Offline';
            }
        }
    }
    isOnlineMode() {
        return this.isOnline;
    }
}
