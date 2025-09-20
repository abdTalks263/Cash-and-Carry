// QuickMart PK - Main JavaScript File
// E-commerce functionality with localStorage persistence

// ===========================================
// GLOBAL VARIABLES AND CONFIGURATION
// ===========================================

const CONFIG = {
    BRAND_NAME: 'QuickMart PK',
    CURRENCY: 'PKR',
    CURRENCY_SYMBOL: '₨',
    STORAGE_KEYS: {
        USERS: 'quickmart_users',
        ADMINS: 'quickmart_admins',
        PRODUCTS: 'quickmart_products',
        CATEGORIES: 'quickmart_categories',
        CART: 'quickmart_cart',
        CURRENT_USER: 'quickmart_current_user',
        ORDERS: 'quickmart_orders'
    }
};

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

/**
 * Initialize localStorage with default data if empty
 */
function initializeStorage() {
    // Initialize users if empty
    if (!localStorage.getItem(CONFIG.STORAGE_KEYS.USERS)) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.USERS, JSON.stringify([]));
    }

    // Initialize admins if empty
    if (!localStorage.getItem(CONFIG.STORAGE_KEYS.ADMINS)) {
        const defaultAdmins = [
            { id: 1, email: 'admin@quickmart.pk', password: 'admin123', name: 'Admin User' }
        ];
        localStorage.setItem(CONFIG.STORAGE_KEYS.ADMINS, JSON.stringify(defaultAdmins));
    }

    // Initialize categories if empty
    if (!localStorage.getItem(CONFIG.STORAGE_KEYS.CATEGORIES)) {
        const defaultCategories = [
            { id: 1, name: 'Food Staples', description: 'آٹا، چاول، دالیں - Rice, flour, pulses, and grains', image: 'assets/foodStaples.jpeg', productCount: 0 },
            { id: 2, name: 'Beverages', description: 'مشروبات - Tea, coffee, juices, and drinks', image: 'assets/Beverages.jpg', productCount: 0 },
            { id: 3, name: 'Snacks & Bakery', description: 'نمکو، بسکٹ - Biscuits, chips, and baked goods', image: 'assets/Snack And Bakery.jpeg', productCount: 0 },
            { id: 4, name: 'Personal Care', description: 'ذاتی نگہداشت - Soap, shampoo, toothpaste, and hygiene', image: 'assets/Personal Care.jpg', productCount: 0 },
            { id: 5, name: 'Household Essentials', description: 'گھریلو اشیاء - Cleaning supplies, detergents, and home essentials', image: 'assets/HouseHold Essential.webp', productCount: 0 }
        ];
        localStorage.setItem(CONFIG.STORAGE_KEYS.CATEGORIES, JSON.stringify(defaultCategories));
    }

    // Initialize products if empty
    if (!localStorage.getItem(CONFIG.STORAGE_KEYS.PRODUCTS)) {
        const defaultProducts = [
            // Food Staples (آٹا، چاول، دالیں)
            { id: 1, name: 'Atta (Flour) – 10kg Bag', price: 1600, category: 'Food Staples', image: 'assets/Atta Flour.jpeg', description: 'Premium quality wheat flour for daily cooking' },
            { id: 2, name: 'Basmati Rice – 5kg Bag', price: 2300, category: 'Food Staples', image: 'assets/Basmati Rice.jpeg', description: 'Long grain basmati rice, perfect for biryani' },
            { id: 3, name: 'Daal Chana – 1kg', price: 320, category: 'Food Staples', image: 'assets/Daal Chana – 1kg.jpeg', description: 'Chickpea lentils, rich in protein' },
            { id: 4, name: 'Daal Masoor – 1kg', price: 280, category: 'Food Staples', image: 'assets/Daal Masoor – 1kg.jpeg', description: 'Red lentils, quick cooking' },
            { id: 5, name: 'Daal Moong – 1kg', price: 340, category: 'Food Staples', image: 'assets/Daal Moong – 1kg.webp', description: 'Green gram lentils, nutritious and delicious' },
            { id: 6, name: 'White Sugar – 5kg', price: 1000, category: 'Food Staples', image: 'assets/White Sugar – 5kg.jpg', description: 'Refined white sugar for daily use' },
            { id: 7, name: 'Brown Sugar – 1kg', price: 260, category: 'Food Staples', image: 'assets/Brown Sugar – 1kg.jpeg', description: 'Natural brown sugar, less processed' },
            { id: 8, name: 'Salt (Refined Iodized) – 800g', price: 80, category: 'Food Staples', image: 'assets/Salt (Refined Iodized) – 800g.jpeg', description: 'Iodized salt for healthy cooking' },
            { id: 9, name: 'Cooking Oil – 5L Can', price: 3200, category: 'Food Staples', image: 'assets/Cooking Oil – 5L Can.jpeg', description: 'Pure vegetable cooking oil' },
            { id: 10, name: 'Desi Ghee – 1kg', price: 1800, category: 'Food Staples', image: 'assets/Desi Ghee – 1kg.webp', description: 'Traditional clarified butter' },
            
            // Beverages (مشروبات)
            { id: 11, name: 'Lipton Yellow Label Tea – 950g', price: 2200, category: 'Beverages', image: 'assets/Lipton Yellow Label Tea – 950g.jpeg', description: 'Premium black tea blend' },
            { id: 12, name: 'Tapal Danedar Tea – 475g', price: 1250, category: 'Beverages', image: 'assets/Tapal Danedar Tea – 475g.jpeg', description: 'Strong and aromatic tea leaves' },
            { id: 13, name: 'Tapal Family Mixture – 475g', price: 1100, category: 'Beverages', image: 'assets/Tapal Family Mixture – 475g.jpeg', description: 'Family blend tea mixture' },
            { id: 14, name: 'Nestlé Milkpak – 1L', price: 260, category: 'Beverages', image: 'assets/Nestlé Milkpak – 1L.avif', description: 'UHT processed fresh milk' },
            { id: 15, name: 'Olper\'s Milk – 1L', price: 250, category: 'Beverages', image: 'assets/Olper\'s Milk – 1L.avif', description: 'Fresh and pure milk' },
            { id: 16, name: 'Pepsi – 1.5L Bottle', price: 180, category: 'Beverages', image: 'assets/Pepsi – 1.5L Bottle.webp', description: 'Refreshing cola drink' },
            { id: 17, name: 'Sprite – 1.5L Bottle', price: 180, category: 'Beverages', image: 'assets/Sprite – 1.5L Bottle.avif', description: 'Lemon-lime flavored soda' },
            { id: 18, name: 'Coca-Cola – 1.5L Bottle', price: 180, category: 'Beverages', image: 'assets/Coca-Cola – 1.5L Bottle.jpeg', description: 'Classic cola taste' },
            { id: 19, name: 'Nestlé Water – 1.5L', price: 70, category: 'Beverages', image: 'assets/Nestlé Water – 1.5L', description: 'Pure drinking water' },
            { id: 20, name: 'Tang Orange – 750g Pack', price: 650, category: 'Beverages', image: 'assets/Tang Orange – 750g Pack.jpg', description: 'Orange flavored instant drink' },
            
            // Snacks & Bakery (نمکو، بسکٹ)
            { id: 21, name: 'Peek Freans Sooper Biscuits – Family Pack', price: 350, category: 'Snacks & Bakery', image: 'assets/Peek Freans Sooper Biscuits – Family Pack.jpeg', description: 'Crispy and delicious family pack' },
            { id: 22, name: 'LU Prince Chocolate Biscuits – 12 Pack', price: 420, category: 'Snacks & Bakery', image: 'assets/LU Prince Chocolate Biscuits – 12 Pack.jpeg', description: 'Chocolate filled biscuits' },
            { id: 23, name: 'Oreo Biscuits – 95g Pack', price: 180, category: 'Snacks & Bakery', image: 'assets/Oreo Biscuits – 95g Pack.jpg', description: 'Cream filled chocolate cookies' },
            { id: 24, name: 'Lays Chips Masala – 40g', price: 60, category: 'Snacks & Bakery', image: 'assets/Lays Chips Masala – 40g.webp', description: 'Spicy masala flavored chips' },
            { id: 25, name: 'Kurkure Red Chili Chatka – 45g', price: 50, category: 'Snacks & Bakery', image: 'assets/Kurkure Red Chili Chatka – 45g.webp', description: 'Spicy corn snacks' },
            { id: 26, name: 'Nimco Mix Nimko – 400g', price: 250, category: 'Snacks & Bakery', image: 'assets/Nimco Mix Nimko – 400g.webp', description: 'Mixed savory snacks' },
            { id: 27, name: 'Cake Up Chocolate Cupcake', price: 60, category: 'Snacks & Bakery', image: 'assets/Cake Up Chocolate Cupcake.png', description: 'Soft chocolate cupcake' },
            { id: 28, name: 'Bake Parlour Rusk – Family Pack', price: 300, category: 'Snacks & Bakery', image: 'assets/Bake Parlour Rusk – Family Pack.jpg', description: 'Crispy sweet rusk' },
            { id: 29, name: 'Shezan Mango Juice – 1L', price: 180, category: 'Snacks & Bakery', image: 'assets/Shezan Mango Juice – 1L.jpeg', description: 'Pure mango fruit juice' },
            { id: 30, name: 'Cupcake Plain – 6 Pack', price: 200, category: 'Snacks & Bakery', image: 'assets/Cupcake Plain – 6 Pack .jpeg', description: 'Soft plain cupcakes' },
            
            // Personal Care (ذاتی نگہداشت)
            { id: 31, name: 'Lifebuoy Soap – 130g', price: 90, category: 'Personal Care', image: 'assets/Life Boy.webp', description: 'Antibacterial protection soap' },
            { id: 32, name: 'Lux Soap – 130g', price: 110, category: 'Personal Care', image: 'assets/Lux Soap – 130g.webp', description: 'Luxurious beauty soap' },
            { id: 33, name: 'Dove Beauty Bar – 100g', price: 150, category: 'Personal Care', image: 'assets/Dove Beauty Bar – 100g.jpeg', description: 'Moisturizing beauty bar' },
            { id: 34, name: 'Sunsilk Black Shine Shampoo – 200ml', price: 380, category: 'Personal Care', image: 'assets/Sunsilk Black Shine Shampoo – 200ml.avif', description: 'Black shine hair care' },
            { id: 35, name: 'Dove Shampoo – 200ml', price: 450, category: 'Personal Care', image: 'assets/Dove Shampoo – 200ml.webp', description: 'Nourishing hair care' },
            { id: 36, name: 'Pantene Shampoo – 200ml', price: 400, category: 'Personal Care', image: 'assets/Pantene Shampoo – 200ml.jpg', description: 'Professional hair care' },
            { id: 37, name: 'Colgate Toothpaste – 100g', price: 180, category: 'Personal Care', image: 'assets/Colgate Toothpaste – 100g.png', description: 'Complete oral care' },
            { id: 38, name: 'Sensodyne Toothpaste – 100g', price: 450, category: 'Personal Care', image: 'assets/Sensodyne Toothpaste – 100g.webp', description: 'Sensitive teeth protection' },
            { id: 39, name: 'Fair & Lovely Cream – 50g', price: 220, category: 'Personal Care', image: 'assets/Fair & Lovely Cream – 50g.webp', description: 'Skin fairness cream' },
            { id: 40, name: 'Vaseline Petroleum Jelly – 100ml', price: 260, category: 'Personal Care', image: 'assets/Vaseline Petroleum Jelly – 100ml.webp', description: 'Moisturizing petroleum jelly' },
            
            // Household Essentials (گھریلو اشیاء)
            { id: 41, name: 'Surf Excel Washing Powder – 1kg', price: 450, category: 'Household Essentials', image: 'assets/Surf Excel Washing Powder – 1kg.jpeg', description: 'Powerful stain removal' },
            { id: 42, name: 'Ariel Washing Powder – 1kg', price: 430, category: 'Household Essentials', image: 'assets/Ariel Washing Powder – 1kg.jpeg', description: 'Advanced cleaning formula' },
            { id: 43, name: 'Bonus Washing Powder – 2kg', price: 520, category: 'Household Essentials', image: 'assets/Bonus Washing Powder – 2kg.jpeg', description: 'Economy pack washing powder' },
            { id: 44, name: 'Harpic Toilet Cleaner – 500ml', price: 280, category: 'Household Essentials', image: 'assets/Harpic Toilet Cleaner – 500ml.jpg', description: 'Powerful toilet cleaner' },
            { id: 45, name: 'Dettol Antiseptic Liquid – 500ml', price: 390, category: 'Household Essentials', image: 'assets/Dettol Antiseptic Liquid – 500ml.png', description: 'Antiseptic protection liquid' },
            { id: 46, name: 'Rose Petal Tissues – 200 Sheets', price: 280, category: 'Household Essentials', image: 'assets/Rose Petal Tissues – 200 Sheets.jpg', description: 'Soft and gentle tissues' },
            { id: 47, name: 'Max Dishwash Liquid – 500ml', price: 150, category: 'Household Essentials', image: 'assets/Max Dishwash Liquid – 500ml.jpg', description: 'Effective dishwashing liquid' },
            { id: 48, name: 'Vim Dishwash Bar', price: 70, category: 'Household Essentials', image: 'assets/Vim Dishwash Bar.jpg', description: 'Traditional dishwashing bar' },
            { id: 49, name: 'Mortein Insect Spray – 300ml', price: 480, category: 'Household Essentials', image: 'assets/Mortein Insect Spray – 300ml.webp', description: 'Effective insect repellent' },
            { id: 50, name: 'Scotch-Brite Scrubber', price: 120, category: 'Household Essentials', image: 'assets/Scotch-Brite Scrubber.jpeg', description: 'Heavy duty cleaning scrubber' }
        ];
        localStorage.setItem(CONFIG.STORAGE_KEYS.PRODUCTS, JSON.stringify(defaultProducts));
        updateCategoryProductCounts();
    }

    // Initialize cart if empty
    if (!localStorage.getItem(CONFIG.STORAGE_KEYS.CART)) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.CART, JSON.stringify([]));
    }

    // Initialize orders if empty
    if (!localStorage.getItem(CONFIG.STORAGE_KEYS.ORDERS)) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.ORDERS, JSON.stringify([]));
    }
}

/**
 * Get data from localStorage
 */
function getStorageData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

/**
 * Save data to localStorage
 */
function setStorageData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Get current user from localStorage
 */
function getCurrentUser() {
    return getStorageData(CONFIG.STORAGE_KEYS.CURRENT_USER)[0] || null;
}

/**
 * Set current user in localStorage
 */
function setCurrentUser(user) {
    setStorageData(CONFIG.STORAGE_KEYS.CURRENT_USER, user ? [user] : []);
}

/**
 * Check if current user is admin
 */
function isCurrentUserAdmin() {
    const user = getCurrentUser();
    return user && user.type === 'admin';
}

/**
 * Format price in PKR
 */
function formatPrice(price) {
    return `${CONFIG.CURRENCY_SYMBOL}${price.toLocaleString()}`;
}

// ===========================================
// AUTHENTICATION FUNCTIONS
// ===========================================

/**
 * Login user or admin
 */
function login(loginInput, password, userType) {
    const users = getStorageData(CONFIG.STORAGE_KEYS.USERS);
    const admins = getStorageData(CONFIG.STORAGE_KEYS.ADMINS);
    
    console.log('Available admins:', admins);
    console.log('Available users:', users);
    
    let user = null;
    
    if (userType === 'admin') {
        user = admins.find(admin => admin.email === loginInput && admin.password === password);
        console.log('Admin search result:', user);
        if (user) user.type = 'admin';
    } else {
        // Check both email and username for regular users
        user = users.find(u => (u.email === loginInput || u.username === loginInput) && u.password === password);
        console.log('User search result:', user);
        if (user) user.type = 'user';
    }
    
    if (user) {
        setCurrentUser(user);
        return { success: true, user };
    }
    
    return { success: false, message: 'Invalid username/email or password' };
}

/**
 * Register new user
 */
function register(userData) {
    const users = getStorageData(CONFIG.STORAGE_KEYS.USERS);
    
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
        return { success: false, message: 'User already exists with this email' };
    }
    
    if (users.find(u => u.username === userData.username)) {
        return { success: false, message: 'Username already taken' };
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        ...userData,
        type: 'user'
    };
    
    users.push(newUser);
    setStorageData(CONFIG.STORAGE_KEYS.USERS, users);
    
    return { success: true, user: newUser };
}

/**
 * Logout current user
 */
function logout() {
    setCurrentUser(null);
}

// ===========================================
// CART FUNCTIONS
// ===========================================

/**
 * Get cart items
 */
function getCartItems() {
    return getStorageData(CONFIG.STORAGE_KEYS.CART);
}

/**
 * Add item to cart
 */
function addToCart(productId, quantity = 1) {
    const cart = getCartItems();
    const products = getStorageData(CONFIG.STORAGE_KEYS.PRODUCTS);
    const product = products.find(p => p.id === productId);
    
    if (!product) return false;
    
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            productId: productId,
            quantity: quantity,
            product: product
        });
    }
    
    setStorageData(CONFIG.STORAGE_KEYS.CART, cart);
    return true;
}

/**
 * Update cart item quantity
 */
function updateCartQuantity(productId, quantity) {
    const cart = getCartItems();
    const item = cart.find(item => item.productId === productId);
    
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            setStorageData(CONFIG.STORAGE_KEYS.CART, cart);
        }
        return true;
    }
    
    return false;
}

/**
 * Remove item from cart
 */
function removeFromCart(productId) {
    const cart = getCartItems();
    const filteredCart = cart.filter(item => item.productId !== productId);
    setStorageData(CONFIG.STORAGE_KEYS.CART, filteredCart);
    return true;
}

/**
 * Clear cart
 */
function clearCart() {
    setStorageData(CONFIG.STORAGE_KEYS.CART, []);
}

/**
 * Get cart total
 */
function getCartTotal() {
    const cart = getCartItems();
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

/**
 * Get cart item count
 */
function getCartItemCount() {
    const cart = getCartItems();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// ===========================================
// PRODUCT FUNCTIONS
// ===========================================

/**
 * Get all products
 */
function getAllProducts() {
    return getStorageData(CONFIG.STORAGE_KEYS.PRODUCTS);
}

/**
 * Get products by category
 */
function getProductsByCategory(category) {
    const products = getAllProducts();
    return products.filter(product => product.category === category);
}

/**
 * Add new product
 */
function addProduct(productData) {
    const products = getAllProducts();
    const newProduct = {
        id: Date.now(),
        ...productData
    };
    
    products.push(newProduct);
    setStorageData(CONFIG.STORAGE_KEYS.PRODUCTS, products);
    updateCategoryProductCounts();
    return newProduct;
}

/**
 * Update product
 */
function updateProduct(productId, productData) {
    const products = getAllProducts();
    const index = products.findIndex(p => p.id === productId);
    
    if (index !== -1) {
        products[index] = { ...products[index], ...productData };
        setStorageData(CONFIG.STORAGE_KEYS.PRODUCTS, products);
        updateCategoryProductCounts();
        return true;
    }
    
    return false;
}

/**
 * Delete product
 */
function deleteProduct(productId) {
    const products = getAllProducts();
    const filteredProducts = products.filter(p => p.id !== productId);
    setStorageData(CONFIG.STORAGE_KEYS.PRODUCTS, filteredProducts);
    updateCategoryProductCounts();
    return true;
}

// ===========================================
// CATEGORY FUNCTIONS
// ===========================================

/**
 * Get all categories
 */
function getAllCategories() {
    return getStorageData(CONFIG.STORAGE_KEYS.CATEGORIES);
}

/**
 * Add new category
 */
function addCategory(categoryData) {
    const categories = getAllCategories();
    const newCategory = {
        id: Date.now(),
        productCount: 0,
        ...categoryData
    };
    
    categories.push(newCategory);
    setStorageData(CONFIG.STORAGE_KEYS.CATEGORIES, categories);
    return newCategory;
}

/**
 * Update category
 */
function updateCategory(categoryId, categoryData) {
    const categories = getAllCategories();
    const index = categories.findIndex(c => c.id === categoryId);
    
    if (index !== -1) {
        categories[index] = { ...categories[index], ...categoryData };
        setStorageData(CONFIG.STORAGE_KEYS.CATEGORIES, categories);
        return true;
    }
    
    return false;
}

/**
 * Delete category
 */
function deleteCategory(categoryId) {
    const categories = getAllCategories();
    const filteredCategories = categories.filter(c => c.id !== categoryId);
    setStorageData(CONFIG.STORAGE_KEYS.CATEGORIES, filteredCategories);
    return true;
}

/**
 * Update product counts for all categories
 */
function updateCategoryProductCounts() {
    const categories = getAllCategories();
    const products = getAllProducts();
    
    categories.forEach(category => {
        category.productCount = products.filter(p => p.category === category.name).length;
    });
    
    setStorageData(CONFIG.STORAGE_KEYS.CATEGORIES, categories);
}

// ===========================================
// NAVIGATION FUNCTIONS
// ===========================================

/**
 * Update navigation based on login status
 */
function updateNavigation() {
    const user = getCurrentUser();
    const isAdmin = isCurrentUserAdmin();
    
    // Update header navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const adminDashboardLink = document.querySelector('.admin-dashboard-link');
    const logoutLink = document.querySelector('.logout-link');
    
    if (user) {
        // Show logout, hide login
        navLinks.forEach(link => {
            if (link.textContent.trim() === 'Login') {
                link.style.display = 'none';
            }
        });
        
        if (logoutLink) {
            logoutLink.style.display = 'block';
        }
        
        // Show admin dashboard if admin
        if (isAdmin && adminDashboardLink) {
            adminDashboardLink.style.display = 'block';
        }
    } else {
        // Show login, hide logout and admin dashboard
        navLinks.forEach(link => {
            if (link.textContent.trim() === 'Login') {
                link.style.display = 'block';
            }
        });
        
        if (logoutLink) {
            logoutLink.style.display = 'none';
        }
        
        if (adminDashboardLink) {
            adminDashboardLink.style.display = 'none';
        }
    }
    
    // Update cart count
    updateCartCount();
}

/**
 * Update cart count in navigation
 */
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        const count = getCartItemCount();
        cartCountElement.textContent = count;
        cartCountElement.style.display = count > 0 ? 'block' : 'none';
    }
}

// ===========================================
// PAGE INITIALIZATION
// ===========================================

/**
 * Initialize page based on current page
 */
function initializePage() {
    initializeStorage();
    updateNavigation();
    updateFullscreenIcon();
    
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'index.html':
        case '':
            initializeHomePage();
            break;
        case 'login.html':
            initializeLoginPage();
            break;
        case 'register.html':
            initializeRegisterPage();
            break;
        case 'categories.html':
            initializeCategoriesPage();
            break;
        case 'cart.html':
            initializeCartPage();
            break;
        case 'admin.html':
            initializeAdminPage();
            break;
        case 'admin-categories.html':
            initializeAdminCategoriesPage();
            break;
        case 'admin-orders.html':
            initializeAdminOrdersPage();
            break;
        case 'checkout.html':
            initializeCheckoutPage();
            break;
    }
}

// ===========================================
// PAGE-SPECIFIC INITIALIZATION FUNCTIONS
// ===========================================

/**
 * Initialize home page
 */
function initializeHomePage() {
    // Update hero tagline
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.textContent = `${CONFIG.BRAND_NAME} – Pakistan's Trusted Cash & Carry`;
    }
    
    // Update CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.textContent = 'Shop Now';
        ctaButton.onclick = () => window.location.href = 'categories.html';
    }
    
    // Featured categories are now static in HTML - no need to load dynamically
}

/**
 * Filter by category from home page
 */
function filterByCategory(categoryName) {
    // Redirect to categories page with category filter
    window.location.href = `categories.html?category=${encodeURIComponent(categoryName)}`;
}

/**
 * Load featured categories on home page
 */
function loadFeaturedCategories() {
    const categoriesGrid = document.querySelector('.categories-grid');
    if (!categoriesGrid) return;
    
    const categories = getAllCategories().slice(0, 6);
    
    categoriesGrid.innerHTML = categories.map(category => `
        <div class="category-card" onclick="window.location.href='categories.html#${category.name.replace(/\s+/g, '-').toLowerCase()}'">
            <div class="category-image">
                <img src="${category.image}" alt="${category.name}">
            </div>
            <h3 class="category-name">${category.name}</h3>
        </div>
    `).join('');
}

/**
 * Initialize login page
 */
function initializeLoginPage() {
    // Ensure admin data is initialized
    initializeStorage();
    
    // Force initialize admin data if missing
    if (!localStorage.getItem(CONFIG.STORAGE_KEYS.ADMINS)) {
        console.log('Admin data missing, initializing...');
        const defaultAdmins = [
            { id: 1, email: 'admin@quickmart.pk', password: 'admin123', name: 'Admin User' }
        ];
        localStorage.setItem(CONFIG.STORAGE_KEYS.ADMINS, JSON.stringify(defaultAdmins));
    }
    
    // Test admin data
    const admins = getStorageData(CONFIG.STORAGE_KEYS.ADMINS);
    console.log('Admin data on login page:', admins);
    
    const form = document.querySelector('.form');
    const tabButtons = document.querySelectorAll('.tab-button');
    
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const loginInput = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const activeTab = document.querySelector('.tab-button.active');
            const userType = activeTab ? activeTab.dataset.tab : 'user';
            
            console.log('Login attempt:', { loginInput, password, userType });
            const result = login(loginInput, password, userType);
            console.log('Login result:', result);
            
            if (result.success) {
                alert('Login successful!');
                if (userType === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'index.html';
                }
            } else {
                alert(result.message);
            }
        });
    }
}

/**
 * Initialize register page
 */
function initializeRegisterPage() {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        // Password confirmation validation
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const phone = document.getElementById('phone');
        
        function validatePasswordMatch() {
            if (password.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity('Passwords do not match');
            } else {
                confirmPassword.setCustomValidity('');
            }
        }
        
        function validatePhone() {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
            if (phone.value && !phoneRegex.test(phone.value)) {
                phone.setCustomValidity('Please enter a valid phone number');
            } else {
                phone.setCustomValidity('');
            }
        }
        
        password.addEventListener('input', validatePasswordMatch);
        confirmPassword.addEventListener('input', validatePasswordMatch);
        phone.addEventListener('input', validatePhone);
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('fullName').value,
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                password: password.value
            };
            
            // Validation
            if (password.value !== confirmPassword.value) {
                alert('Passwords do not match!');
                return;
            }
            
            if (!document.getElementById('terms').checked) {
                alert('Please accept the Terms of Service and Privacy Policy');
                return;
            }
            
            if (password.value.length < 6) {
                alert('Password must be at least 6 characters long');
                return;
            }
            
            const result = register(formData);
            
            if (result.success) {
                alert('Registration successful! Please login.');
                window.location.href = 'login.html';
            } else {
                alert(result.message);
            }
        });
    }
}

/**
 * Update products data with latest catalog
 */
function updateProductsData() {
    const latestProducts = [
        // Food Staples (آٹا، چاول، دالیں)
        { id: 1, name: 'Atta (Flour) – 10kg Bag', price: 1600, category: 'Food Staples', image: 'assets/Atta Flour.jpeg', description: 'Premium quality wheat flour for daily cooking' },
        { id: 2, name: 'Basmati Rice – 5kg Bag', price: 2300, category: 'Food Staples', image: 'assets/Basmati Rice.jpeg', description: 'Long grain basmati rice, perfect for biryani' },
        { id: 3, name: 'Daal Chana – 1kg', price: 320, category: 'Food Staples', image: 'assets/Daal Chana – 1kg.jpeg', description: 'Chickpea lentils, rich in protein' },
        { id: 4, name: 'Daal Masoor – 1kg', price: 280, category: 'Food Staples', image: 'assets/Daal Masoor – 1kg.jpeg', description: 'Red lentils, quick cooking' },
        { id: 5, name: 'Daal Moong – 1kg', price: 340, category: 'Food Staples', image: 'assets/Daal Moong – 1kg.webp', description: 'Green gram lentils, nutritious and delicious' },
        { id: 6, name: 'White Sugar – 5kg', price: 1000, category: 'Food Staples', image: 'assets/White Sugar – 5kg.jpg', description: 'Refined white sugar for daily use' },
        { id: 7, name: 'Brown Sugar – 1kg', price: 260, category: 'Food Staples', image: 'assets/Brown Sugar – 1kg.jpeg', description: 'Natural brown sugar, less processed' },
        { id: 8, name: 'Salt (Refined Iodized) – 800g', price: 80, category: 'Food Staples', image: 'assets/Salt (Refined Iodized) – 800g.jpeg', description: 'Iodized salt for healthy cooking' },
        { id: 9, name: 'Cooking Oil – 5L Can', price: 3200, category: 'Food Staples', image: 'assets/Cooking Oil – 5L Can.jpeg', description: 'Pure vegetable cooking oil' },
        { id: 10, name: 'Desi Ghee – 1kg', price: 1800, category: 'Food Staples', image: 'assets/Desi Ghee – 1kg.webp', description: 'Traditional clarified butter' },
        
        // Beverages (مشروبات)
        { id: 11, name: 'Lipton Yellow Label Tea – 950g', price: 2200, category: 'Beverages', image: 'assets/Lipton Yellow Label Tea – 950g.jpeg', description: 'Premium black tea blend' },
        { id: 12, name: 'Tapal Danedar Tea – 475g', price: 1250, category: 'Beverages', image: 'assets/Tapal Danedar Tea – 475g.jpeg', description: 'Strong and aromatic tea leaves' },
        { id: 13, name: 'Tapal Family Mixture – 475g', price: 1100, category: 'Beverages', image: 'assets/Tapal Family Mixture – 475g.jpeg', description: 'Family blend tea mixture' },
        { id: 14, name: 'Nestlé Milkpak – 1L', price: 260, category: 'Beverages', image: 'assets/Nestlé Milkpak – 1L.avif', description: 'UHT processed fresh milk' },
        { id: 15, name: 'Olper\'s Milk – 1L', price: 250, category: 'Beverages', image: 'assets/Olper\'s Milk – 1L.avif', description: 'Fresh and pure milk' },
        { id: 16, name: 'Pepsi – 1.5L Bottle', price: 180, category: 'Beverages', image: 'assets/Pepsi – 1.5L Bottle.webp', description: 'Refreshing cola drink' },
        { id: 17, name: 'Sprite – 1.5L Bottle', price: 180, category: 'Beverages', image: 'assets/Sprite – 1.5L Bottle.avif', description: 'Lemon-lime flavored soda' },
        { id: 18, name: 'Coca-Cola – 1.5L Bottle', price: 180, category: 'Beverages', image: 'assets/Coca-Cola – 1.5L Bottle.jpeg', description: 'Classic cola taste' },
        { id: 19, name: 'Nestlé Water – 1.5L', price: 70, category: 'Beverages', image: 'assets/Nestlé Water – 1.5L', description: 'Pure drinking water' },
        { id: 20, name: 'Tang Orange – 750g Pack', price: 650, category: 'Beverages', image: 'assets/Tang Orange – 750g Pack.jpg', description: 'Orange flavored instant drink' },
        
        // Snacks & Bakery (نمکو، بسکٹ)
        { id: 21, name: 'Peek Freans Sooper Biscuits – Family Pack', price: 350, category: 'Snacks & Bakery', image: 'assets/Peek Freans Sooper Biscuits – Family Pack.jpeg', description: 'Crispy and delicious family pack' },
        { id: 22, name: 'LU Prince Chocolate Biscuits – 12 Pack', price: 420, category: 'Snacks & Bakery', image: 'assets/LU Prince Chocolate Biscuits – 12 Pack.jpeg', description: 'Chocolate filled biscuits' },
        { id: 23, name: 'Oreo Biscuits – 95g Pack', price: 180, category: 'Snacks & Bakery', image: 'assets/Oreo Biscuits – 95g Pack.jpg', description: 'Cream filled chocolate cookies' },
        { id: 24, name: 'Lays Chips Masala – 40g', price: 60, category: 'Snacks & Bakery', image: 'assets/Lays Chips Masala – 40g.webp', description: 'Spicy masala flavored chips' },
        { id: 25, name: 'Kurkure Red Chili Chatka – 45g', price: 50, category: 'Snacks & Bakery', image: 'assets/Kurkure Red Chili Chatka – 45g.webp', description: 'Spicy corn snacks' },
        { id: 26, name: 'Nimco Mix Nimko – 400g', price: 250, category: 'Snacks & Bakery', image: 'assets/Nimco Mix Nimko – 400g.webp', description: 'Mixed savory snacks' },
        { id: 27, name: 'Cake Up Chocolate Cupcake', price: 60, category: 'Snacks & Bakery', image: 'assets/Cake Up Chocolate Cupcake.png', description: 'Soft chocolate cupcake' },
        { id: 28, name: 'Bake Parlour Rusk – Family Pack', price: 300, category: 'Snacks & Bakery', image: 'assets/Bake Parlour Rusk – Family Pack.jpg', description: 'Crispy sweet rusk' },
        { id: 29, name: 'Shezan Mango Juice – 1L', price: 180, category: 'Snacks & Bakery', image: 'assets/Shezan Mango Juice – 1L.jpeg', description: 'Pure mango fruit juice' },
        { id: 30, name: 'Cupcake Plain – 6 Pack', price: 200, category: 'Snacks & Bakery', image: 'assets/Cupcake Plain – 6 Pack .jpeg', description: 'Soft plain cupcakes' },
        
        // Personal Care (ذاتی نگہداشت)
        { id: 31, name: 'Lifebuoy Soap – 130g', price: 90, category: 'Personal Care', image: 'assets/Life Boy.webp', description: 'Antibacterial protection soap' },
        { id: 32, name: 'Lux Soap – 130g', price: 110, category: 'Personal Care', image: 'assets/Lux Soap – 130g.webp', description: 'Luxurious beauty soap' },
        { id: 33, name: 'Dove Beauty Bar – 100g', price: 150, category: 'Personal Care', image: 'assets/Dove Beauty Bar – 100g.jpeg', description: 'Moisturizing beauty bar' },
        { id: 34, name: 'Sunsilk Black Shine Shampoo – 200ml', price: 380, category: 'Personal Care', image: 'assets/Sunsilk Black Shine Shampoo – 200ml.avif', description: 'Black shine hair care' },
        { id: 35, name: 'Dove Shampoo – 200ml', price: 450, category: 'Personal Care', image: 'assets/Dove Shampoo – 200ml.webp', description: 'Nourishing hair care' },
        { id: 36, name: 'Pantene Shampoo – 200ml', price: 400, category: 'Personal Care', image: 'assets/Pantene Shampoo – 200ml.jpg', description: 'Professional hair care' },
        { id: 37, name: 'Colgate Toothpaste – 100g', price: 180, category: 'Personal Care', image: 'assets/Colgate Toothpaste – 100g.png', description: 'Complete oral care' },
        { id: 38, name: 'Sensodyne Toothpaste – 100g', price: 450, category: 'Personal Care', image: 'assets/Sensodyne Toothpaste – 100g.webp', description: 'Sensitive teeth protection' },
        { id: 39, name: 'Fair & Lovely Cream – 50g', price: 220, category: 'Personal Care', image: 'assets/Fair & Lovely Cream – 50g.webp', description: 'Skin fairness cream' },
        { id: 40, name: 'Vaseline Petroleum Jelly – 100ml', price: 260, category: 'Personal Care', image: 'assets/Vaseline Petroleum Jelly – 100ml.webp', description: 'Moisturizing petroleum jelly' },
        
        // Household Essentials (گھریلو اشیاء)
        { id: 41, name: 'Surf Excel Washing Powder – 1kg', price: 450, category: 'Household Essentials', image: 'assets/Surf Excel Washing Powder – 1kg.jpeg', description: 'Powerful stain removal' },
        { id: 42, name: 'Ariel Washing Powder – 1kg', price: 430, category: 'Household Essentials', image: 'assets/Ariel Washing Powder – 1kg.jpeg', description: 'Advanced cleaning formula' },
        { id: 43, name: 'Bonus Washing Powder – 2kg', price: 520, category: 'Household Essentials', image: 'assets/Bonus Washing Powder – 2kg.jpeg', description: 'Economy pack washing powder' },
        { id: 44, name: 'Harpic Toilet Cleaner – 500ml', price: 280, category: 'Household Essentials', image: 'assets/Harpic Toilet Cleaner – 500ml.jpg', description: 'Powerful toilet cleaner' },
        { id: 45, name: 'Dettol Antiseptic Liquid – 500ml', price: 390, category: 'Household Essentials', image: 'assets/Dettol Antiseptic Liquid – 500ml.png', description: 'Antiseptic protection liquid' },
        { id: 46, name: 'Rose Petal Tissues – 200 Sheets', price: 280, category: 'Household Essentials', image: 'assets/Rose Petal Tissues – 200 Sheets.jpg', description: 'Soft and gentle tissues' },
        { id: 47, name: 'Max Dishwash Liquid – 500ml', price: 150, category: 'Household Essentials', image: 'assets/Max Dishwash Liquid – 500ml.jpg', description: 'Effective dishwashing liquid' },
        { id: 48, name: 'Vim Dishwash Bar', price: 70, category: 'Household Essentials', image: 'assets/Vim Dishwash Bar.jpg', description: 'Traditional dishwashing bar' },
        { id: 49, name: 'Mortein Insect Spray – 300ml', price: 480, category: 'Household Essentials', image: 'assets/Mortein Insect Spray – 300ml.webp', description: 'Effective insect repellent' },
        { id: 50, name: 'Scotch-Brite Scrubber', price: 120, category: 'Household Essentials', image: 'assets/Scotch-Brite Scrubber.jpeg', description: 'Heavy duty cleaning scrubber' }
    ];
    
    // Always update the products data
    localStorage.setItem(CONFIG.STORAGE_KEYS.PRODUCTS, JSON.stringify(latestProducts));
    console.log('Products data updated with latest catalog');
}

/**
 * Update categories data with latest Pakistani market categories
 */
function updateCategoriesData() {
    const latestCategories = [
        { id: 1, name: 'Food Staples', description: 'آٹا، چاول، دالیں - Rice, flour, pulses, and grains', image: 'assets/foodStaples.jpeg', productCount: 0 },
        { id: 2, name: 'Beverages', description: 'مشروبات - Tea, coffee, juices, and drinks', image: 'assets/Beverages.jpg', productCount: 0 },
        { id: 3, name: 'Snacks & Bakery', description: 'نمکو، بسکٹ - Biscuits, chips, and baked goods', image: 'assets/Snack And Bakery.jpeg', productCount: 0 },
        { id: 4, name: 'Personal Care', description: 'ذاتی نگہداشت - Soap, shampoo, toothpaste, and hygiene', image: 'assets/Personal Care.jpg', productCount: 0 },
        { id: 5, name: 'Household Essentials', description: 'گھریلو اشیاء - Cleaning supplies, detergents, and home essentials', image: 'assets/HouseHold Essential.webp', productCount: 0 }
    ];
    
    // Calculate product counts for each category
    const products = getStorageData(CONFIG.STORAGE_KEYS.PRODUCTS);
    latestCategories.forEach(category => {
        category.productCount = products.filter(product => product.category === category.name).length;
    });
    
    // Always update the categories data
    localStorage.setItem(CONFIG.STORAGE_KEYS.CATEGORIES, JSON.stringify(latestCategories));
    console.log('Categories data updated with latest Pakistani market categories');
}

/**
 * Initialize categories page
 */
function initializeCategoriesPage() {
    // Force update products data to ensure we have the latest catalog
    updateProductsData();
    loadAllProducts();
    initializeCategoryFilters();
    
    // Check for category filter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category');
    if (categoryFilter) {
        // Set the active category button
        const filterButtons = document.querySelectorAll('.category-filter-btn');
        filterButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-category') === categoryFilter) {
                button.classList.add('active');
            }
        });
        
        // Filter products by the selected category
        filterProductsByCategory(categoryFilter);
    }
}

/**
 * Load all products on categories page
 */
function loadAllProducts() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    
    const products = getAllProducts();
    displayProducts(products);
}

/**
 * Initialize category filters
 */
function initializeCategoryFilters() {
    const filterButtons = document.querySelectorAll('.category-filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get category from data attribute
            const category = button.getAttribute('data-category');
            
            // Filter and display products
            filterProductsByCategory(category);
        });
    });
}

/**
 * Filter products by category
 */
function filterProductsByCategory(category) {
    const products = getAllProducts();
    console.log('All products:', products);
    console.log('Filtering by category:', category);
    
    let filteredProducts = products;
    
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
        console.log('Filtered products:', filteredProducts);
    }
    
    displayProducts(filteredProducts);
}

/**
 * Display products in the grid
 */
function displayProducts(products) {
    const productsGrid = document.querySelector('.products-grid');
    const productsCount = document.querySelector('#products-count');
    
    if (!productsGrid) return;
    
    // Update products count
    if (productsCount) {
        productsCount.textContent = `${products.length} product${products.length !== 1 ? 's' : ''} found`;
    }
    
    // Display products
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" id="product-${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200/333/fff?text=No+Image'">
            </div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${formatPrice(product.price)}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

/**
 * Initialize cart page
 */
function initializeCartPage() {
    // Ensure cart is properly initialized
    if (!localStorage.getItem(CONFIG.STORAGE_KEYS.CART)) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.CART, JSON.stringify([]));
    }
    
    loadCartItems();
    setupCartEventListeners();
}

/**
 * Load cart items on cart page
 */
function loadCartItems() {
    const cartItems = getCartItems();
    const tbody = document.querySelector('.cart-table tbody');
    
    if (!tbody) return;
    
    if (cartItems.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 2rem;">
                    Your cart is empty. <a href="categories.html">Start shopping</a>
                </td>
            </tr>
        `;
        updateCartTotal(); // Update total to show PKR 0
        return;
    }
    
    tbody.innerHTML = cartItems.map(item => `
        <tr class="cart-item">
            <td class="product-cell">
                <div class="product-info">
                    <img src="${item.product.image}" alt="${item.product.name}" class="product-thumbnail">
                    <span class="product-name">${item.product.name}</span>
                </div>
            </td>
            <td class="quantity-cell">
                <div class="quantity-controls">
                    <button class="quantity-btn minus-btn" onclick="updateCartQuantity(${item.productId}, ${item.quantity - 1})">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateCartQuantity(${item.productId}, this.value)">
                    <button class="quantity-btn plus-btn" onclick="updateCartQuantity(${item.productId}, ${item.quantity + 1})">+</button>
                </div>
            </td>
            <td class="price-cell">${formatPrice(item.product.price)}</td>
            <td class="total-cell">${formatPrice(item.product.price * item.quantity)}</td>
            <td class="actions-cell">
                <button class="remove-btn" onclick="removeFromCart(${item.productId})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    updateCartTotal();
}

/**
 * Setup cart event listeners
 */
function setupCartEventListeners() {
    // Continue shopping button
    const continueShoppingBtn = document.querySelector('.continue-shopping-btn');
    if (continueShoppingBtn) {
        continueShoppingBtn.onclick = () => window.location.href = 'categories.html';
    }
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.onclick = () => {
            const total = getCartTotal();
            if (total > 0) {
                if (confirm(`Proceed to checkout for ${formatPrice(total)}?`)) {
                    alert('Order placed successfully! Thank you for shopping with QuickMart PK.');
                    clearCart();
                    loadCartItems();
                }
            } else {
                alert('Your cart is empty!');
            }
        };
    }
}

/**
 * Update cart total display
 */
function updateCartTotal() {
    const totalElement = document.getElementById('grand-total');
    if (totalElement) {
        const total = getCartTotal();
        totalElement.textContent = formatPrice(total);
    }
}

/**
 * Initialize admin page
 */
function initializeAdminPage() {
    if (!isCurrentUserAdmin()) {
        alert('Access denied. Admin login required.');
        window.location.href = 'login.html';
        return;
    }
    
    loadAdminProducts();
    setupAdminEventListeners();
}

/**
 * Load products on admin page
 */
function loadAdminProducts() {
    const tbody = document.querySelector('.admin-table tbody');
    if (!tbody) return;
    
    const products = getAllProducts();
    
    tbody.innerHTML = products.map(product => `
        <tr class="table-row">
            <td class="image-cell">
                <img src="${product.image}" alt="${product.name}" class="product-thumb">
            </td>
            <td class="name-cell">${product.name}</td>
            <td class="price-cell">${formatPrice(product.price)}</td>
            <td class="category-cell">${product.category}</td>
            <td class="actions-cell">
                <button class="edit-btn" onclick="editProduct(${product.id})">
                    <i class="fas fa-pencil-alt"></i>
                    Edit
                </button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i>
                    Delete
                </button>
            </td>
        </tr>
    `).join('');
}

/**
 * Setup admin event listeners
 */
function setupAdminEventListeners() {
    // Add product button
    const addProductBtn = document.querySelector('.add-product-btn');
    if (addProductBtn) {
        addProductBtn.onclick = () => showAddProductModal();
    }
    
    // Navigation to other admin pages
    const allNavItems = document.querySelectorAll('.nav-item');
    allNavItems.forEach((item, index) => {
        if (index === 1) { // Second nav item (Manage Categories)
            item.onclick = () => {
                console.log('Navigating to admin categories page');
                window.location.href = 'admin-categories.html';
            };
        } else if (index === 2) { // Third nav item (Manage Orders)
            item.onclick = () => {
                console.log('Navigating to admin orders page');
                window.location.href = 'admin-orders.html';
            };
        }
    });
}

/**
 * Show add product modal
 */
function showAddProductModal() {
    const categories = getAllCategories();
    const categoryOptions = categories.map(cat => `<option value="${cat.name}">${cat.name}</option>`).join('');
    
    const modal = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <h3>Add New Product</h3>
                <form id="addProductForm">
                    <div class="form-group">
                        <label>Product Name</label>
                        <input type="text" id="productName" required>
                    </div>
                    <div class="form-group">
                        <label>Price (PKR)</label>
                        <input type="number" id="productPrice" required>
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select id="productCategory" required>
                            ${categoryOptions}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Image URL</label>
                        <input type="url" id="productImage" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="productDescription"></textarea>
                    </div>
                    <div class="modal-actions">
                        <button type="button" onclick="closeModal()">Cancel</button>
                        <button type="submit">Add Product</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
    
    document.getElementById('addProductForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const productData = {
            name: document.getElementById('productName').value,
            price: parseFloat(document.getElementById('productPrice').value),
            category: document.getElementById('productCategory').value,
            image: document.getElementById('productImage').value,
            description: document.getElementById('productDescription').value
        };
        
        addProduct(productData);
        closeModal();
        loadAdminProducts();
        alert('Product added successfully!');
    });
}

/**
 * Close modal
 */
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

/**
 * Edit product
 */
function editProduct(productId) {
    const products = getAllProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const categories = getAllCategories();
    const categoryOptions = categories.map(cat => 
        `<option value="${cat.name}" ${cat.name === product.category ? 'selected' : ''}>${cat.name}</option>`
    ).join('');
    
    const modal = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <h3>Edit Product</h3>
                <form id="editProductForm">
                    <div class="form-group">
                        <label>Product Name</label>
                        <input type="text" id="editProductName" value="${product.name}" required>
                    </div>
                    <div class="form-group">
                        <label>Price (PKR)</label>
                        <input type="number" id="editProductPrice" value="${product.price}" required>
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select id="editProductCategory" required>
                            ${categoryOptions}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Image URL</label>
                        <input type="url" id="editProductImage" value="${product.image}" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="editProductDescription">${product.description || ''}</textarea>
                    </div>
                    <div class="modal-actions">
                        <button type="button" onclick="closeModal()">Cancel</button>
                        <button type="submit">Update Product</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
    
    document.getElementById('editProductForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const productData = {
            name: document.getElementById('editProductName').value,
            price: parseFloat(document.getElementById('editProductPrice').value),
            category: document.getElementById('editProductCategory').value,
            image: document.getElementById('editProductImage').value,
            description: document.getElementById('editProductDescription').value
        };
        
        updateProduct(productId, productData);
        closeModal();
        loadAdminProducts();
        alert('Product updated successfully!');
    });
}

/**
 * Delete product
 */
function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        deleteProduct(productId);
        loadAdminProducts();
        alert('Product deleted successfully!');
    }
}

/**
 * Initialize admin categories page
 */
function initializeAdminCategoriesPage() {
    if (!isCurrentUserAdmin()) {
        alert('Access denied. Admin login required.');
        window.location.href = 'login.html';
        return;
    }
    
    // Force update categories with latest data
    updateCategoriesData();
    loadAdminCategories();
    setupAdminCategoriesEventListeners();
}

/**
 * Initialize checkout page
 */
function initializeCheckoutPage() {
    const user = getCurrentUser();
    if (!user) {
        alert('Please login to proceed to checkout');
        window.location.href = 'login.html';
        return;
    }
    
    loadCheckoutItems();
    setupCheckoutEventListeners();
    prefillUserData(user);
}

/**
 * Load checkout items
 */
function loadCheckoutItems() {
    const cartItems = getCartItems();
    const summaryItems = document.getElementById('checkout-items');
    
    if (!summaryItems) return;
    
    if (cartItems.length === 0) {
        summaryItems.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #cccccc;">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>Your cart is empty</p>
                <a href="categories.html" style="color: #ffffff; text-decoration: underline;">Start shopping</a>
            </div>
        `;
        return;
    }
    
    summaryItems.innerHTML = cartItems.map(item => `
        <div class="summary-item">
            <img src="${item.product.image}" alt="${item.product.name}" class="summary-item-image" onerror="this.src='https://via.placeholder.com/60x60/333/fff?text=No+Image'">
            <div class="summary-item-details">
                <h4>${item.product.name}</h4>
                <p>Qty: ${item.quantity} × ${formatPrice(item.product.price)}</p>
            </div>
            <div class="summary-item-price">${formatPrice(item.product.price * item.quantity)}</div>
        </div>
    `).join('');
    
    updateCheckoutTotals();
}

/**
 * Update checkout totals
 */
function updateCheckoutTotals() {
    const cartItems = getCartItems();
    const subtotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const deliveryFee = 150;
    const tax = Math.round(subtotal * 0.05); // 5% tax
    const grandTotal = subtotal + deliveryFee + tax;
    
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('delivery-fee').textContent = formatPrice(deliveryFee);
    document.getElementById('tax').textContent = formatPrice(tax);
    document.getElementById('grand-total').textContent = formatPrice(grandTotal);
}

/**
 * Setup checkout event listeners
 */
function setupCheckoutEventListeners() {
    // Payment method change
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', handlePaymentMethodChange);
    });
    
    // Form submission
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmission);
    }
    
    // Card number formatting
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', formatCardNumber);
    }
    
    // Expiry date formatting
    const expiryDate = document.getElementById('expiryDate');
    if (expiryDate) {
        expiryDate.addEventListener('input', formatExpiryDate);
    }
}

/**
 * Handle payment method change
 */
function handlePaymentMethodChange(event) {
    const cardDetails = document.getElementById('cardDetails');
    const mobilePaymentDetails = document.getElementById('mobilePaymentDetails');
    
    // Hide all payment details
    if (cardDetails) cardDetails.style.display = 'none';
    if (mobilePaymentDetails) mobilePaymentDetails.style.display = 'none';
    
    // Show relevant payment details
    if (event.target.value === 'card' && cardDetails) {
        cardDetails.style.display = 'block';
    } else if ((event.target.value === 'jazzcash' || event.target.value === 'easypaisa') && mobilePaymentDetails) {
        mobilePaymentDetails.style.display = 'block';
    }
}

/**
 * Format card number
 */
function formatCardNumber(event) {
    let value = event.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    event.target.value = formattedValue;
}

/**
 * Format expiry date
 */
function formatExpiryDate(event) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    event.target.value = value;
}

/**
 * Prefill user data
 */
function prefillUserData(user) {
    if (user.name) {
        const nameParts = user.name.split(' ');
        document.getElementById('firstName').value = nameParts[0] || '';
        document.getElementById('lastName').value = nameParts.slice(1).join(' ') || '';
    }
    document.getElementById('email').value = user.email || '';
    document.getElementById('phone').value = user.phone || '';
}

/**
 * Handle checkout submission
 */
function handleCheckoutSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const paymentMethod = formData.get('paymentMethod');
    
    if (!paymentMethod) {
        alert('Please select a payment method');
        return;
    }
    
    // Validate payment method specific fields
    if (paymentMethod === 'card') {
        if (!validateCardPayment()) return;
    } else if (paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') {
        if (!validateMobilePayment()) return;
    }
    
    // Process order
    processOrder(paymentMethod);
}

/**
 * Validate card payment
 */
function validateCardPayment() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardName = document.getElementById('cardName').value;
    
    if (!cardNumber || cardNumber.length < 16) {
        alert('Please enter a valid card number');
        return false;
    }
    
    if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
        alert('Please enter a valid expiry date (MM/YY)');
        return false;
    }
    
    if (!cvv || cvv.length < 3) {
        alert('Please enter a valid CVV');
        return false;
    }
    
    if (!cardName.trim()) {
        alert('Please enter the name on card');
        return false;
    }
    
    return true;
}

/**
 * Validate mobile payment
 */
function validateMobilePayment() {
    const mobileNumber = document.getElementById('mobileNumber').value;
    const accountName = document.getElementById('accountName').value;
    
    if (!mobileNumber || mobileNumber.length < 10) {
        alert('Please enter a valid mobile number');
        return false;
    }
    
    if (!accountName.trim()) {
        alert('Please enter the account name');
        return false;
    }
    
    return true;
}

/**
 * Process order
 */
function processOrder(paymentMethod) {
    const cartItems = getCartItems();
    const user = getCurrentUser();
    const total = getCartTotal() + 150 + Math.round(getCartTotal() * 0.05);
    
    // Generate unique order ID
    const orderId = 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    
    // Get customer information from form
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    
    // Create order summary with proper structure
    const orderSummary = {
        id: orderId,
        customer: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            address: address
        },
        items: cartItems.map(item => ({
            name: item.product.name,
            image: item.product.image,
            quantity: item.quantity,
            price: item.product.price,
            total: item.product.price * item.quantity
        })),
        subtotal: getCartTotal(),
        deliveryFee: 150,
        tax: Math.round(getCartTotal() * 0.05),
        grandTotal: total,
        paymentMethod: paymentMethod,
        status: 'pending',
        date: new Date().toISOString(),
        statusHistory: [{
            status: 'pending',
            date: new Date().toISOString(),
            notes: 'Order placed by customer'
        }]
    };
    
    // Save order to localStorage
    const orders = getStorageData(CONFIG.STORAGE_KEYS.ORDERS);
    orders.push(orderSummary);
    localStorage.setItem(CONFIG.STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    
    // Clear cart
    clearCart();
    
    // Show success message
    alert(`Order placed successfully!\n\nOrder ID: #${orderId}\nOrder Total: ${formatPrice(total)}\nPayment Method: ${getPaymentMethodName(paymentMethod)}\n\nThank you for shopping with QuickMart PK!`);
    
    // Redirect to home page
    window.location.href = 'index.html';
}

/**
 * Get payment method display name
 */
function getPaymentMethodName(method) {
    const methods = {
        'card': 'Credit/Debit Card',
        'cash': 'Cash on Delivery',
        'jazzcash': 'JazzCash',
        'easypaisa': 'EasyPaisa'
    };
    return methods[method] || method;
}

/**
 * Load categories on admin categories page
 */
function loadAdminCategories() {
    const tbody = document.querySelector('.admin-table tbody');
    if (!tbody) return;
    
    const categories = getAllCategories();
    
    tbody.innerHTML = categories.map(category => `
        <tr class="table-row">
            <td class="image-cell">
                <img src="${category.image}" alt="${category.name}" class="product-thumb">
            </td>
            <td class="name-cell">${category.name}</td>
            <td class="description-cell">${category.description}</td>
            <td class="products-cell">${category.productCount}</td>
            <td class="actions-cell">
                <button class="edit-btn" onclick="editCategory(${category.id})">
                    <i class="fas fa-pencil-alt"></i>
                    Edit
                </button>
                <button class="delete-btn" onclick="deleteCategory(${category.id})">
                    <i class="fas fa-trash"></i>
                    Delete
                </button>
            </td>
        </tr>
    `).join('');
}

/**
 * Setup admin categories event listeners
 */
function setupAdminCategoriesEventListeners() {
    // Add category button
    const addCategoryBtn = document.querySelector('.add-product-btn');
    if (addCategoryBtn) {
        addCategoryBtn.textContent = 'Add New Category';
        addCategoryBtn.onclick = () => showAddCategoryModal();
    }
    
    // Navigation back to products page
    const manageProductsBtn = document.querySelector('.nav-item:first-child');
    if (manageProductsBtn) {
        manageProductsBtn.onclick = () => {
            window.location.href = 'admin.html';
        };
    }
}

/**
 * Show add category modal
 */
function showAddCategoryModal() {
    const modal = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <h3>Add New Category</h3>
                <form id="addCategoryForm">
                    <div class="form-group">
                        <label>Category Name</label>
                        <input type="text" id="categoryName" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="categoryDescription" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Image URL</label>
                        <input type="url" id="categoryImage" required>
                    </div>
                    <div class="modal-actions">
                        <button type="button" onclick="closeModal()">Cancel</button>
                        <button type="submit">Add Category</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
    
    document.getElementById('addCategoryForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const categoryData = {
            name: document.getElementById('categoryName').value,
            description: document.getElementById('categoryDescription').value,
            image: document.getElementById('categoryImage').value
        };
        
        addCategory(categoryData);
        closeModal();
        loadAdminCategories();
        alert('Category added successfully!');
    });
}

/**
 * Edit category
 */
function editCategory(categoryId) {
    const categories = getAllCategories();
    const category = categories.find(c => c.id === categoryId);
    
    if (!category) return;
    
    const modal = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <h3>Edit Category</h3>
                <form id="editCategoryForm">
                    <div class="form-group">
                        <label>Category Name</label>
                        <input type="text" id="editCategoryName" value="${category.name}" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="editCategoryDescription" required>${category.description}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Image URL</label>
                        <input type="url" id="editCategoryImage" value="${category.image}" required>
                    </div>
                    <div class="modal-actions">
                        <button type="button" onclick="closeModal()">Cancel</button>
                        <button type="submit">Update Category</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
    
    document.getElementById('editCategoryForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const categoryData = {
            name: document.getElementById('editCategoryName').value,
            description: document.getElementById('editCategoryDescription').value,
            image: document.getElementById('editCategoryImage').value
        };
        
        updateCategory(categoryId, categoryData);
        closeModal();
        loadAdminCategories();
        alert('Category updated successfully!');
    });
}

/**
 * Delete category
 */
function deleteCategory(categoryId) {
    if (confirm('Are you sure you want to delete this category?')) {
        deleteCategory(categoryId);
        loadAdminCategories();
        alert('Category deleted successfully!');
    }
}

// ===========================================
// ORDER MANAGEMENT FUNCTIONS
// ===========================================

/**
 * Initialize admin orders page
 */
function initializeAdminOrdersPage() {
    if (!isCurrentUserAdmin()) {
        alert('Access denied. Admin login required.');
        window.location.href = 'login.html';
        return;
    }
    
    loadOrders();
    setupOrderEventListeners();
}

/**
 * Load and display orders
 */
function loadOrders() {
    const orders = getStorageData(CONFIG.STORAGE_KEYS.ORDERS);
    const ordersTableBody = document.getElementById('orders-table-body');
    
    if (!ordersTableBody) return;
    
    if (orders.length === 0) {
        ordersTableBody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-orders">
                    <i class="fas fa-shopping-bag"></i>
                    <h3>No Orders Yet</h3>
                    <p>Orders will appear here when customers place them.</p>
                </td>
            </tr>
        `;
        return;
    }
    
    // Sort orders by date (newest first)
    const sortedOrders = orders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    ordersTableBody.innerHTML = sortedOrders.map(order => `
        <tr class="table-row">
            <td class="order-id-cell">#${order.id}</td>
            <td class="customer-cell">
                <div>
                    <strong>${order.customer.firstName} ${order.customer.lastName}</strong><br>
                    <small>${order.customer.email}</small>
                </div>
            </td>
            <td class="items-cell">${order.items.length} item${order.items.length !== 1 ? 's' : ''}</td>
            <td class="total-cell">${CONFIG.CURRENCY_SYMBOL} ${order.grandTotal.toLocaleString()}</td>
            <td class="status-cell">
                <span class="status-badge status-${order.status}">${getStatusDisplayName(order.status)}</span>
            </td>
            <td class="date-cell">${formatDate(order.date)}</td>
            <td class="actions-cell">
                <div class="order-actions">
                    <button class="view-order-btn" onclick="viewOrderDetails('${order.id}')">
                        <i class="fas fa-eye"></i>
                        View
                    </button>
                    <button class="update-status-btn" onclick="showStatusUpdateModal('${order.id}')">
                        <i class="fas fa-edit"></i>
                        Update
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

/**
 * Setup order page event listeners
 */
function setupOrderEventListeners() {
    // Status filter
    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', filterOrdersByStatus);
    }
    
    // Navigation to other admin pages
    const manageProductsBtn = document.querySelector('.nav-item:first-child');
    if (manageProductsBtn) {
        manageProductsBtn.onclick = () => {
            window.location.href = 'admin.html';
        };
    }
    
    const manageCategoriesBtn = document.querySelector('.nav-item:nth-child(2)');
    if (manageCategoriesBtn) {
        manageCategoriesBtn.onclick = () => {
            window.location.href = 'admin-categories.html';
        };
    }
    
    // Modal close buttons
    const closeButtons = document.querySelectorAll('.close, #close-order-details, #cancel-status-update');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Status update form
    const statusUpdateForm = document.getElementById('status-update-form');
    if (statusUpdateForm) {
        statusUpdateForm.addEventListener('submit', handleStatusUpdate);
    }
    
    // Confirm status update button
    const confirmStatusBtn = document.getElementById('confirm-status-update');
    if (confirmStatusBtn) {
        confirmStatusBtn.addEventListener('click', handleStatusUpdate);
    }
}

/**
 * Filter orders by status
 */
function filterOrdersByStatus() {
    const statusFilter = document.getElementById('status-filter');
    const selectedStatus = statusFilter.value;
    const orders = getStorageData(CONFIG.STORAGE_KEYS.ORDERS);
    const ordersTableBody = document.getElementById('orders-table-body');
    
    if (!ordersTableBody) return;
    
    let filteredOrders = orders;
    if (selectedStatus !== 'all') {
        filteredOrders = orders.filter(order => order.status === selectedStatus);
    }
    
    if (filteredOrders.length === 0) {
        ordersTableBody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-orders">
                    <i class="fas fa-search"></i>
                    <h3>No Orders Found</h3>
                    <p>No orders match the selected filter.</p>
                </td>
            </tr>
        `;
        return;
    }
    
    // Sort orders by date (newest first)
    const sortedOrders = filteredOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    ordersTableBody.innerHTML = sortedOrders.map(order => `
        <tr class="table-row">
            <td class="order-id-cell">#${order.id}</td>
            <td class="customer-cell">
                <div>
                    <strong>${order.customer.firstName} ${order.customer.lastName}</strong><br>
                    <small>${order.customer.email}</small>
                </div>
            </td>
            <td class="items-cell">${order.items.length} item${order.items.length !== 1 ? 's' : ''}</td>
            <td class="total-cell">${CONFIG.CURRENCY_SYMBOL} ${order.grandTotal.toLocaleString()}</td>
            <td class="status-cell">
                <span class="status-badge status-${order.status}">${getStatusDisplayName(order.status)}</span>
            </td>
            <td class="date-cell">${formatDate(order.date)}</td>
            <td class="actions-cell">
                <div class="order-actions">
                    <button class="view-order-btn" onclick="viewOrderDetails('${order.id}')">
                        <i class="fas fa-eye"></i>
                        View
                    </button>
                    <button class="update-status-btn" onclick="showStatusUpdateModal('${order.id}')">
                        <i class="fas fa-edit"></i>
                        Update
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

/**
 * View order details
 */
function viewOrderDetails(orderId) {
    const orders = getStorageData(CONFIG.STORAGE_KEYS.ORDERS);
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        alert('Order not found');
        return;
    }
    
    const modal = document.getElementById('order-details-modal');
    const content = document.getElementById('order-details-content');
    
    if (!modal || !content) return;
    
    content.innerHTML = `
        <div class="order-details-section">
            <h4>Order Information</h4>
            <div class="order-info-grid">
                <div class="order-info-item">
                    <span class="order-info-label">Order ID</span>
                    <span class="order-info-value">#${order.id}</span>
                </div>
                <div class="order-info-item">
                    <span class="order-info-label">Status</span>
                    <span class="order-info-value">
                        <span class="status-badge status-${order.status}">${getStatusDisplayName(order.status)}</span>
                    </span>
                </div>
                <div class="order-info-item">
                    <span class="order-info-label">Date</span>
                    <span class="order-info-value">${formatDate(order.date)}</span>
                </div>
                <div class="order-info-item">
                    <span class="order-info-label">Payment Method</span>
                    <span class="order-info-value">${getPaymentMethodName(order.paymentMethod)}</span>
                </div>
            </div>
        </div>
        
        <div class="order-details-section">
            <h4>Customer Information</h4>
            <div class="order-info-grid">
                <div class="order-info-item">
                    <span class="order-info-label">Name</span>
                    <span class="order-info-value">${order.customer.firstName} ${order.customer.lastName}</span>
                </div>
                <div class="order-info-item">
                    <span class="order-info-label">Email</span>
                    <span class="order-info-value">${order.customer.email}</span>
                </div>
                <div class="order-info-item">
                    <span class="order-info-label">Phone</span>
                    <span class="order-info-value">${order.customer.phone}</span>
                </div>
                <div class="order-info-item">
                    <span class="order-info-label">Address</span>
                    <span class="order-info-value">${order.customer.address}</span>
                </div>
            </div>
        </div>
        
        <div class="order-details-section">
            <h4>Order Items</h4>
            <div class="order-items-list">
                ${order.items.map(item => `
                    <div class="order-item">
                        <div class="order-item-info">
                            <img src="${item.image}" alt="${item.name}" class="order-item-image" onerror="this.src='https://via.placeholder.com/50x50/333/fff?text=No+Image'">
                            <div class="order-item-details">
                                <h5>${item.name}</h5>
                                <p>Quantity: ${item.quantity}</p>
                            </div>
                        </div>
                        <div class="order-item-price">${CONFIG.CURRENCY_SYMBOL} ${(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="order-totals">
                <div class="order-total-row">
                    <span class="order-total-label">Subtotal:</span>
                    <span class="order-total-value">${CONFIG.CURRENCY_SYMBOL} ${order.subtotal.toLocaleString()}</span>
                </div>
                <div class="order-total-row">
                    <span class="order-total-label">Delivery Fee:</span>
                    <span class="order-total-value">${CONFIG.CURRENCY_SYMBOL} ${order.deliveryFee.toLocaleString()}</span>
                </div>
                <div class="order-total-row">
                    <span class="order-total-label">Tax (5%):</span>
                    <span class="order-total-value">${CONFIG.CURRENCY_SYMBOL} ${order.tax.toLocaleString()}</span>
                </div>
                <div class="order-total-row">
                    <span class="order-total-label">Grand Total:</span>
                    <span class="order-total-value">${CONFIG.CURRENCY_SYMBOL} ${order.grandTotal.toLocaleString()}</span>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

/**
 * Show status update modal
 */
function showStatusUpdateModal(orderId) {
    const orders = getStorageData(CONFIG.STORAGE_KEYS.ORDERS);
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        alert('Order not found');
        return;
    }
    
    const modal = document.getElementById('status-update-modal');
    const statusSelect = document.getElementById('new-status');
    
    if (!modal || !statusSelect) return;
    
    // Set current status
    statusSelect.value = order.status;
    
    // Store order ID for update
    modal.dataset.orderId = orderId;
    
    modal.style.display = 'block';
}

/**
 * Handle status update
 */
function handleStatusUpdate(event) {
    event.preventDefault();
    
    const modal = document.getElementById('status-update-modal');
    const orderId = modal.dataset.orderId;
    const newStatus = document.getElementById('new-status').value;
    const notes = document.getElementById('status-notes').value;
    
    if (!orderId || !newStatus) {
        alert('Please select a status');
        return;
    }
    
    const orders = getStorageData(CONFIG.STORAGE_KEYS.ORDERS);
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) {
        alert('Order not found');
        return;
    }
    
    // Update order status
    orders[orderIndex].status = newStatus;
    orders[orderIndex].statusHistory = orders[orderIndex].statusHistory || [];
    orders[orderIndex].statusHistory.push({
        status: newStatus,
        date: new Date().toISOString(),
        notes: notes || ''
    });
    
    // Save to localStorage
    localStorage.setItem(CONFIG.STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    
    // Close modal
    modal.style.display = 'none';
    
    // Reload orders
    loadOrders();
    
    // Show success message
    alert(`Order #${orderId} status updated to ${getStatusDisplayName(newStatus)}`);
}

/**
 * Get status display name
 */
function getStatusDisplayName(status) {
    const statusNames = {
        'pending': 'Pending',
        'processing': 'Processing',
        'out-for-delivery': 'Out for Delivery',
        'delivered': 'Delivered',
        'cancelled': 'Cancelled'
    };
    return statusNames[status] || status;
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ===========================================
// SEARCH FUNCTIONALITY
// ===========================================

/**
 * Show search modal
 */
function showSearchModal() {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = `
        <div class="modal-overlay" onclick="closeSearchModal()">
            <div class="modal-content search-modal" onclick="event.stopPropagation()">
                <div class="search-header">
                    <h3>Search Products</h3>
                    <button class="close-search" onclick="closeSearchModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="search-input-container">
                    <input type="text" id="searchInput" placeholder="Search for products..." autofocus>
                    <button id="searchButton" onclick="performSearch()">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
                <div id="searchResults" class="search-results"></div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
    
    // Focus on search input after a short delay
    setTimeout(() => {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
            
            // Search on Enter key
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    performSearch();
                }
            });
            
            // Search on input change (live search)
            searchInput.addEventListener('input', function() {
                if (this.value.length >= 2) {
                    performSearch();
                } else {
                    clearSearchResults();
                }
            });
        }
    }, 100);
}

/**
 * Close search modal
 */
function closeSearchModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

/**
 * Perform search
 */
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    const searchResults = document.getElementById('searchResults');
    
    if (!searchResults) return;
    
    if (!searchTerm) {
        clearSearchResults();
        return;
    }
    
    const products = getAllProducts();
    console.log('Searching for:', searchTerm);
    console.log('Available products:', products);
    
    // Debug: Show first few products
    if (products.length > 0) {
        console.log('Sample product:', products[0]);
    }
    
    const filteredProducts = products.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(searchTerm);
        const categoryMatch = product.category.toLowerCase().includes(searchTerm);
        const descriptionMatch = product.description && product.description.toLowerCase().includes(searchTerm);
        
        return nameMatch || categoryMatch || descriptionMatch;
    });
    
    console.log('Filtered products:', filteredProducts);
    
    if (filteredProducts.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No products found for "${searchTerm}"</p>
                <p>Try different keywords or browse our categories</p>
            </div>
        `;
    } else {
        searchResults.innerHTML = `
            <div class="search-results-header">
                <p>Found ${filteredProducts.length} product(s) for "${searchTerm}"</p>
            </div>
            <div class="search-products-grid">
                ${filteredProducts.map(product => `
                    <div class="search-product-card" onclick="viewProduct(${product.id})">
                        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/200x120/333/fff?text=No+Image'">
                        <div class="search-product-info">
                            <h4>${product.name}</h4>
                            <p class="search-product-category">${product.category}</p>
                            <p class="search-product-price">${formatPrice(product.price)}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

/**
 * Clear search results
 */
function clearSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.innerHTML = '';
    }
}

/**
 * View product (redirect to categories page)
 */
function viewProduct(productId) {
    closeSearchModal();
    // Scroll to product on categories page
    window.location.href = `categories.html`;
    
    // Add a small delay to ensure page loads, then scroll to product
    setTimeout(() => {
        const productElement = document.getElementById(`product-${productId}`);
        if (productElement) {
            productElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, 500);
}

// ===========================================
// CART FUNCTIONALITY
// ===========================================

/**
 * Toggle cart dropdown or redirect to cart page
 */
function toggleCart() {
    const user = getCurrentUser();
    
    if (!user) {
        // If not logged in, redirect to login
        alert('Please login to view your cart');
        window.location.href = 'login.html';
        return;
    }
    
    // Redirect to cart page
    window.location.href = 'cart.html';
}

// ===========================================
// USER PROFILE FUNCTIONALITY
// ===========================================

/**
 * Show user profile dropdown or redirect to login
 */
function toggleUserProfile() {
    const user = getCurrentUser();
    
    if (!user) {
        // If not logged in, redirect to login
        window.location.href = 'login.html';
        return;
    }
    
    // Show user profile dropdown
    showUserProfileDropdown();
}

/**
 * Show user profile dropdown
 */
function showUserProfileDropdown() {
    const user = getCurrentUser();
    const isAdmin = isCurrentUserAdmin();
    
    // Remove existing dropdown if any
    const existingDropdown = document.querySelector('.user-dropdown');
    if (existingDropdown) {
        existingDropdown.remove();
        return;
    }
    
    const dropdown = `
        <div class="user-dropdown">
            <div class="user-dropdown-content">
                <div class="user-info">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="user-details">
                        <h4>${user.name || user.email}</h4>
                        <p>${user.email}</p>
                        <span class="user-type">${isAdmin ? 'Administrator' : 'Customer'}</span>
                    </div>
                </div>
                <div class="user-dropdown-menu">
                    <a href="#" class="dropdown-item" onclick="viewProfile()">
                        <i class="fas fa-user-circle"></i>
                        My Profile
                    </a>
                    <a href="cart.html" class="dropdown-item">
                        <i class="fas fa-shopping-cart"></i>
                        My Cart
                    </a>
                    ${isAdmin ? `
                        <a href="admin.html" class="dropdown-item">
                            <i class="fas fa-cog"></i>
                            Admin Dashboard
                        </a>
                    ` : ''}
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item logout-item" onclick="logoutUser()">
                        <i class="fas fa-sign-out-alt"></i>
                        Logout
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', dropdown);
    
    // Close dropdown when clicking outside
    setTimeout(() => {
        document.addEventListener('click', closeUserDropdown);
    }, 100);
}

/**
 * Close user dropdown
 */
function closeUserDropdown(event) {
    const dropdown = document.querySelector('.user-dropdown');
    if (dropdown && !dropdown.contains(event.target) && !event.target.closest('.fa-user')) {
        dropdown.remove();
        document.removeEventListener('click', closeUserDropdown);
    }
}

/**
 * View user profile
 */
function viewProfile() {
    const user = getCurrentUser();
    if (user) {
        alert(`Profile Information:\n\nName: ${user.name || 'Not provided'}\nEmail: ${user.email}\nType: ${user.type === 'admin' ? 'Administrator' : 'Customer'}`);
    }
    closeUserDropdown();
}

/**
 * Logout user
 */
function logoutUser() {
    if (confirm('Are you sure you want to logout?')) {
        logout();
        window.location.href = 'index.html';
    }
    closeUserDropdown();
}

// ===========================================
// FULLSCREEN FUNCTIONALITY
// ===========================================

/**
 * Toggle fullscreen mode
 */
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        // Enter fullscreen
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

/**
 * Update fullscreen icon based on current state
 */
function updateFullscreenIcon() {
    const fullscreenIcons = document.querySelectorAll('.fa-expand-arrows-alt');
    const isFullscreen = document.fullscreenElement || 
                        document.webkitFullscreenElement || 
                        document.msFullscreenElement;
    
    fullscreenIcons.forEach(icon => {
        if (isFullscreen) {
            icon.className = 'fas fa-compress-arrows-alt';
            icon.title = 'Exit Fullscreen';
        } else {
            icon.className = 'fas fa-expand-arrows-alt';
            icon.title = 'Enter Fullscreen';
        }
    });
}

// ===========================================
// GLOBAL EVENT LISTENERS
// ===========================================

// Global click handlers
document.addEventListener('click', function(e) {
    // Logout functionality
    if (e.target.classList.contains('logout-link') || e.target.closest('.logout-link')) {
        logout();
        window.location.href = 'index.html';
    }
    
    // Search functionality
    if (e.target.classList.contains('fa-search') && !e.target.closest('.search-modal')) {
        showSearchModal();
    }
    
    // Cart functionality
    if (e.target.classList.contains('fa-shopping-cart')) {
        toggleCart();
    }
    
    // User profile functionality
    if (e.target.classList.contains('fa-user')) {
        toggleUserProfile();
    }
    
    // Fullscreen toggle functionality
    if (e.target.classList.contains('fa-expand-arrows-alt') || e.target.classList.contains('fa-compress-arrows-alt')) {
        toggleFullscreen();
    }
});

// Fullscreen change event listeners
document.addEventListener('fullscreenchange', updateFullscreenIcon);
document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
document.addEventListener('msfullscreenchange', updateFullscreenIcon);

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);

// ===========================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// ===========================================

// Make functions available globally
window.addToCart = addToCart;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.editCategory = editCategory;
window.deleteCategory = deleteCategory;
window.closeModal = closeModal;
window.showSearchModal = showSearchModal;
window.closeSearchModal = closeSearchModal;
window.performSearch = performSearch;
window.viewProduct = viewProduct;
window.toggleCart = toggleCart;
window.toggleUserProfile = toggleUserProfile;
window.viewProfile = viewProfile;
window.logoutUser = logoutUser;
window.updateProductsData = updateProductsData;
window.updateCategoriesData = updateCategoriesData;
window.filterByCategory = filterByCategory;
window.initializeCheckoutPage = initializeCheckoutPage;
window.viewOrderDetails = viewOrderDetails;
window.showStatusUpdateModal = showStatusUpdateModal;

// Test function for admin login
window.testAdminLogin = function() {
    console.log('Testing admin login...');
    const result = login('admin@quickmart.pk', 'admin123', 'admin');
    console.log('Test result:', result);
    return result;
};

// Function to reset admin data
window.resetAdminData = function() {
    console.log('Resetting admin data...');
    const defaultAdmins = [
        { id: 1, email: 'admin@quickmart.pk', password: 'admin123', name: 'Admin User' }
    ];
    localStorage.setItem(CONFIG.STORAGE_KEYS.ADMINS, JSON.stringify(defaultAdmins));
    console.log('Admin data reset:', defaultAdmins);
    return defaultAdmins;
};

// Function to debug admin login step by step
window.debugAdminLogin = function() {
    console.log('=== DEBUGGING ADMIN LOGIN ===');
    
    // Check if admin data exists
    const adminData = localStorage.getItem(CONFIG.STORAGE_KEYS.ADMINS);
    console.log('Raw admin data from localStorage:', adminData);
    
    // Parse admin data
    const admins = JSON.parse(adminData || '[]');
    console.log('Parsed admin data:', admins);
    
    // Check specific admin
    const targetAdmin = admins.find(admin => admin.email === 'admin@quickmart.pk');
    console.log('Target admin found:', targetAdmin);
    
    // Test login function
    const result = login('admin@quickmart.pk', 'admin123', 'admin');
    console.log('Login result:', result);
    
    // Check current user
    const currentUser = getCurrentUser();
    console.log('Current user after login:', currentUser);
    
    return { admins, targetAdmin, result, currentUser };
};
