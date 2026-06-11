class StorageService {
    static set(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving:', error);
            return false;
        }
    }
    static get(key, defaultValue) {
        defaultValue = (defaultValue === undefined) ? null : defaultValue;
        try {
            var data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('Error reading:', error);
            return defaultValue;
        }
    }
    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            return false;
        }
    }
    static clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            return false;
        }
    }
}
