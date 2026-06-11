class UserModel {
    constructor() {
        this.users = StorageService.get(APP_CONFIG.STORAGE_KEYS.USERS, []);
        this.currentUser = StorageService.get(APP_CONFIG.STORAGE_KEYS.CURRENT_USER, null);
        if (this.users.length === 0) {
            this.users.push(DEFAULT_ADMIN);
            this.saveUsers();
        }
    }
    saveUsers() { StorageService.set(APP_CONFIG.STORAGE_KEYS.USERS, this.users); }
    saveCurrentUser() { StorageService.set(APP_CONFIG.STORAGE_KEYS.CURRENT_USER, this.currentUser); }
    register(userData) {
        if (this.users.find(function(u) { return u.email === userData.email; })) {
            return { success: false, error: 'El email ya está registrado' };
        }
        var newUser = {
            id: Helpers.generateId(),
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: 'client',
            avatar: userData.avatar || 'https://ui-avatars.com/api/?background=6366f1&color=fff&name=' + userData.name,
            address: userData.address || '',
            createdAt: new Date().toISOString()
        };
        this.users.push(newUser);
        this.saveUsers();
        var userCopy = Object.assign({}, newUser);
        delete userCopy.password;
        return { success: true, user: userCopy };
    }
    login(email, password) {
        var self = this;
        var user = this.users.find(function(u) { return u.email === email && u.password === password; });
        if (!user) return { success: false, error: 'Credenciales inválidas' };
        var userCopy = Object.assign({}, user);
        delete userCopy.password;
        this.currentUser = userCopy;
        this.saveCurrentUser();
        return { success: true, user: this.currentUser };
    }
    logout() {
        this.currentUser = null;
        StorageService.remove(APP_CONFIG.STORAGE_KEYS.CURRENT_USER);
        return { success: true };
    }
    updateProfile(userId, updates) {
        var index = this.users.findIndex(function(u) { return u.id === userId; });
        if (index === -1) return { success: false, error: 'Usuario no encontrado' };
        this.users[index] = Object.assign({}, this.users[index], updates);
        this.saveUsers();
        if (this.currentUser && this.currentUser.id === userId) {
            this.currentUser = Object.assign({}, this.currentUser, updates);
            this.saveCurrentUser();
        }
        return { success: true, user: this.currentUser };
    }
    updatePassword(userId, oldPassword, newPassword) {
        var user = this.users.find(function(u) { return u.id === userId; });
        if (!user) return { success: false, error: 'Usuario no encontrado' };
        if (user.password !== oldPassword) return { success: false, error: 'Contraseña incorrecta' };
        user.password = newPassword;
        this.saveUsers();
        return { success: true };
    }
    resetPassword(email, newPassword) {
        var user = this.users.find(function(u) { return u.email === email; });
        if (!user) return { success: false, error: 'Email no registrado' };
        user.password = newPassword;
        this.saveUsers();
        return { success: true };
    }
    getCurrentUser() { return this.currentUser; }
    isAdmin() { return this.currentUser && this.currentUser.role === 'admin'; }
    getAllUsers() {
        return this.users.map(function(u) {
            var copy = Object.assign({}, u);
            delete copy.password;
            return copy;
        });
    }
}
