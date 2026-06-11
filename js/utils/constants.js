const APP_CONFIG = {
    NAME: 'TechStore',
    VERSION: '1.0.0',
    API_URL: 'https://fakestoreapi.com',
    STORAGE_KEYS: {
        USERS: 'techstore_users',
        CURRENT_USER: 'techstore_current_user',
        PRODUCTS: 'techstore_products',
        CART: 'techstore_cart',
        ORDERS: 'techstore_orders',
        REVIEWS: 'techstore_reviews',
        THEME: 'techstore_theme'
    },
    ROLES: { ADMIN: 'admin', CLIENT: 'client' }
};

const DEFAULT_ADMIN = {
    id: 'admin1',
    name: 'Administrador',
    email: 'admin@techstore.com',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?background=6366f1&color=fff&name=Admin',
    address: 'Oficina Central'
};
