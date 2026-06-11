// Inicializar modelos
var userModel = new UserModel();
var productModel = new ProductModel();
var cartModel = new CartModel();
var orderModel = new OrderModel();
var reviewModel = new ReviewModel();
var offlineService = new OfflineService();

var currentPage = 'home';
var selectedProductId = null;

// Navegación
var pages = {
    home: renderHomeView,
    catalog: renderCatalogView,
    cart: renderCartView,
    login: renderLoginView,
    register: renderRegisterView,
    profile: renderProfileView,
    checkout: renderCheckoutView,
    'product-detail': renderProductDetailView,
    'admin-dashboard': renderAdminDashboardView,
    'admin-products': renderAdminProductsView,
    'admin-orders': renderAdminOrdersView,
    'forgot-password': renderForgotPasswordView
};

async function init() {
    if (productModel.getAllProducts().length === 0) {
        await productModel.loadFromAPI();
    }
    renderHeader();
    renderCurrentPage();
    setupEventListeners();
    loadTheme();
    offlineService.updateStatusDisplay();
}

function renderHeader() {
    var currentUser = userModel.getCurrentUser();
    var isAdmin = userModel.isAdmin();
    var cartSummary = cartModel.getCartSummary();
    
    var header = document.getElementById('app-header');
    header.innerHTML = 
        <div class="header">
            <div class="header-container">
                <div class="logo">
                    <h1><i class="fas fa-store"></i> TechStore</h1>
                </div>
                <div class="status-indicator">
                    <span id="onlineStatus" class="status offline"><i class="fas fa-wifi-slash"></i> Offline</span>
                </div>
                <button id="themeToggle" class="btn" style="padding:0.5rem;"><i class="fas fa-moon"></i></button>
                <nav class="nav-menu">
                    <button class="nav-link" data-page="home">Inicio</button>
                    <button class="nav-link" data-page="catalog">Catálogo</button>
                    <button class="nav-link" data-page="cart">Carrito <span id="cartCount"></span></button>
                    
                    
                </nav>
            </div>
        </div>
    ;
}

function renderCurrentPage() {
    var page = pages[currentPage];
    if (page) page();
    else renderHomeView();
    updateCartCount();
}

function updateCartCount() {
    var cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cartModel.getCartSummary().totalItems;
    }
}

function setupEventListeners() {
    document.addEventListener('click', function(e) {
        var navLink = e.target.closest('.nav-link');
        if (navLink && navLink.dataset.page) {
            e.preventDefault();
            currentPage = navLink.dataset.page;
            renderCurrentPage();
            renderHeader();
        }
        
        if (e.target.id === 'logoutBtn') {
            userModel.logout();
            currentPage = 'home';
            renderHeader();
            renderCurrentPage();
            Helpers.showNotification('Sesión cerrada', 'success');
        }
        
        if (e.target.id === 'themeToggle') {
            toggleTheme();
        }
    });
}

function toggleTheme() {
    var currentTheme = document.documentElement.getAttribute('data-theme');
    var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    StorageService.set(APP_CONFIG.STORAGE_KEYS.THEME, newTheme);
}

function loadTheme() {
    var savedTheme = StorageService.get(APP_CONFIG.STORAGE_KEYS.THEME, 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
}

window.addToCart = function(productId) {
    cartModel.addItem(productId);
    updateCartCount();
    Helpers.showNotification('Producto agregado al carrito', 'success');
};

window.viewProduct = function(productId) {
    selectedProductId = productId;
    currentPage = 'product-detail';
    renderCurrentPage();
    renderHeader();
};

// Iniciar
init();
