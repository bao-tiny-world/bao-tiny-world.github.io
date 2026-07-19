// Bao & Tiny World - Core Application Script

// State variables
let cart = [];
let activeCategory = 'all';
let searchQuery = '';
let sortBy = 'featured';
let activeProduct = null;
let orders = [];
let currentDetailSlideIndex = 0;

// Integration Config Settings
let config = {
  tgBotToken: '',
  tgChatId: '',
  emailjsServiceId: '',
  emailjsTemplateId: '',
  emailjsPublicKey: '',
  emailjsRecipient: 'admin@miyabiminis.jp'
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  loadConfig();
  loadCart();
  setupEventListeners();
  renderProducts();
  updateCartUI();
  loadOrders();
  initDynamicBanner();

  // Telegram WebApp Setup
  if (window.Telegram && window.Telegram.WebApp) {
    const tgWebApp = window.Telegram.WebApp;
    tgWebApp.ready();
    tgWebApp.expand();

    // Set Header color to match our Sky Blue theme
    tgWebApp.setHeaderColor('#bae6fd');

    console.log("Running inside Telegram Web App context:", tgWebApp.initDataUnsafe);
  }
});

// Load configuration from localStorage
function loadConfig() {
  const savedConfig = localStorage.getItem('miyabi_minis_config');
  if (savedConfig) {
    config = { ...config, ...JSON.parse(savedConfig) };
  }
}

// Save configuration to localStorage
function saveConfig(newConfig) {
  config = { ...config, ...newConfig };
  localStorage.setItem('miyabi_minis_config', JSON.stringify(config));
  showToast("Configuration saved successfully!", "success");
}

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem('miyabi_minis_cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('miyabi_minis_cart', JSON.stringify(cart));
}

// Setup all DOM elements event listeners
function setupEventListeners() {
  // Navigation elements
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderProducts();
    });
  }

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      renderProducts();
    });
  }

  // Categories filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      const targetBtn = e.currentTarget;
      targetBtn.classList.add('active');
      activeCategory = targetBtn.dataset.category;
      renderProducts();
    });
  });

  // Cart Drawer toggles
  const cartTrigger = document.getElementById('cart-trigger');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  const cartDrawer = document.getElementById('cart-drawer-panel');

  const openCart = () => {
    if (cartOverlay) cartOverlay.classList.add('open');
    if (cartDrawer) cartDrawer.classList.add('open');
    document.body.style.overflow = 'hidden'; // prevent bg scroll
  };

  const closeCart = () => {
    if (cartOverlay) cartOverlay.classList.remove('open');
    if (cartDrawer) cartDrawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (cartTrigger) cartTrigger.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Hero CTA
  const heroCta = document.getElementById('hero-cta-btn');
  if (heroCta) {
    heroCta.addEventListener('click', () => {
      const shopSection = document.getElementById('shop-catalog');
      shopSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Modals Event Listeners (Close triggers)
  const detailModal = document.getElementById('detail-modal-overlay');
  const closeDetail = document.getElementById('close-detail-modal');
  if (closeDetail) closeDetail.addEventListener('click', () => closeModal(detailModal));
  if (detailModal) detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) closeModal(detailModal);
  });

  const checkoutModal = document.getElementById('checkout-modal-overlay');
  const closeCheckout = document.getElementById('close-checkout-modal');
  if (closeCheckout) closeCheckout.addEventListener('click', () => closeModal(checkoutModal));
  if (checkoutModal) checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) closeModal(checkoutModal);
  });

  const configModal = document.getElementById('config-modal-overlay');
  const loginModal = document.getElementById('login-modal-overlay');
  const configTrigger = document.getElementById('config-trigger-btn');
  const closeConfig = document.getElementById('close-config-modal');
  const closeLogin = document.getElementById('close-login-modal');

  if (configTrigger) {
    configTrigger.addEventListener('click', () => {
      document.getElementById('login-username').value = '';
      document.getElementById('login-password').value = '';
      openModal(loginModal);
    });
  }
  if (closeLogin) closeLogin.addEventListener('click', () => closeModal(loginModal));
  if (loginModal) loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) closeModal(loginModal);
  });

  if (closeConfig) closeConfig.addEventListener('click', () => closeModal(configModal));
  if (configModal) configModal.addEventListener('click', (e) => {
    if (e.target === configModal) closeModal(configModal);
  });

  // Admin Login Form Submission
  const adminLoginForm = document.getElementById('admin-login-form');
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const usernameInput = document.getElementById('login-username').value.trim();
      const passwordInput = document.getElementById('login-password').value;

      // Default Admin Credentials: admin / admin
      if (usernameInput === 'admin' && passwordInput === 'admin') {
        closeModal(loginModal);
        openConfigModal();
        showToast("Welcome back, Administrator!", "success");
      } else {
        showToast("Invalid username or password. Access denied.", "error");
        document.getElementById('login-password').value = '';
      }
    });
  }

  const successModal = document.getElementById('success-modal-overlay');
  const successBtn = document.getElementById('success-done-btn');
  if (successBtn) successBtn.addEventListener('click', () => {
    closeModal(successModal);
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.close();
    }
  });

  // Proceed to checkout button in cart
  const cartCheckoutBtn = document.getElementById('cart-checkout-btn');
  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener('click', () => {
      closeCart();
      openModal(checkoutModal);
    });
  }

  // Checkout Form Submission
  const checkoutForm = document.getElementById('checkout-shipping-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }

  // Config Modal actions
  const configSaveBtn = document.getElementById('config-save-btn');
  if (configSaveBtn) {
    configSaveBtn.addEventListener('click', handleConfigSave);
  }

  const configResetBtn = document.getElementById('config-reset-btn');
  if (configResetBtn) {
    configResetBtn.addEventListener('click', () => {
      document.getElementById('config-tg-token').value = '';
      document.getElementById('config-tg-chatid').value = '';
      document.getElementById('config-emailjs-service').value = '';
      document.getElementById('config-emailjs-template').value = '';
      document.getElementById('config-emailjs-publickey').value = '';
      document.getElementById('config-emailjs-recipient').value = 'admin@miyabiminis.jp';
    });
  }

  // Back to Top Button
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Admin Panel Tabs Switch
  const tabBtnOrders = document.getElementById('tab-btn-orders');
  const tabBtnSettings = document.getElementById('tab-btn-settings');
  const panelOrders = document.getElementById('panel-orders');
  const panelSettings = document.getElementById('panel-settings');

  if (tabBtnOrders && tabBtnSettings) {
    tabBtnOrders.addEventListener('click', () => {
      tabBtnOrders.classList.add('active');
      tabBtnSettings.classList.remove('active');
      panelOrders.classList.add('active');
      panelSettings.classList.remove('active');
      renderOrdersHistory();
    });

    tabBtnSettings.addEventListener('click', () => {
      tabBtnSettings.classList.add('active');
      tabBtnOrders.classList.remove('active');
      panelSettings.classList.add('active');
      panelOrders.classList.remove('active');
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeModal(detailModal);
      closeModal(checkoutModal);
      closeModal(configModal);
      closeModal(loginModal);
      closeModal(successModal);
    }
  });
}

// Global category click handler for footer links
window.filterCategory = function (category) {
  const btnId = `btn-cat-${category}`;
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.click();
  }
};

// Render Products Grid based on activeCategory, searchQuery, and sortBy
function renderProducts() {
  const grid = document.getElementById('products-grid-list');
  if (!grid) return;

  // Filter
  let filtered = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Render
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-catalog">
        <i class="fa-solid fa-face-frown"></i>
        <h3>No products found</h3>
        <p>Try refining your search keyword or clearing the filters.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => {
    const primaryImage = (product.images && product.images.length > 0) ? product.images[0] : product.image;
    return `
      <article class="product-card" id="product-${product.id}">
        <div class="product-image-container" onclick="openProductDetail(${product.id})">
          <span class="product-category-tag">${product.category}</span>
          <img src="${primaryImage}" alt="${product.name}" class="product-image" loading="lazy">
        </div>
        <div class="product-details">
          <div class="product-rating">
            <i class="fa-solid fa-star"></i>
            <strong>${product.rating}</strong> 
          </div>
          <h3 class="product-title" onclick="openProductDetail(${product.id})">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-footer" style="flex-direction: column; align-items: flex-start; gap: 10px;">
            <span class="product-price-inquire" style="font-size: 0.85rem; font-weight: 600; color: var(--accent-pink-deep);"><i class="fa-solid fa-tags"></i> For Price details check with seller</span>
            <button class="add-to-cart-btn" onclick="openProductDetail(${product.id})" style="width: 100%; justify-content: center;">
              <i class="fa-solid fa-circle-info"></i> Inquire Details
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Add product to shopping cart
window.addToCart = function (productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: (product.images && product.images.length > 0) ? product.images[0] : product.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added "${product.name}" to cart!`, "success");

  // Bounce animation on cart badge
  const trigger = document.getElementById('cart-trigger');
  if (trigger) {
    trigger.classList.add('pulse');
    setTimeout(() => trigger.classList.remove('pulse'), 300);
  }
};

// Update cart badge and sliding drawer UI
function updateCartUI() {
  const badgeCount = document.getElementById('cart-badge-count');
  const cartList = document.getElementById('cart-items-list-container');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartGrandTotal = document.getElementById('cart-grand-total');
  const checkoutBtn = document.getElementById('cart-checkout-btn');

  // Count items
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (badgeCount) badgeCount.textContent = totalCount;

  // If cart is empty
  if (cart.length === 0) {
    if (cartList) {
      cartList.innerHTML = `
        <div class="cart-empty-state">
          <i class="fa-solid fa-basket-shopping"></i>
          <p>Your shopping cart is empty.</p>
          <button class="success-btn" onclick="document.getElementById('close-cart-btn').click();" style="font-size: 0.85rem; padding: 8px 20px;">Browse Store</button>
        </div>
      `;
    }
    if (cartSubtotal) cartSubtotal.textContent = "$0.00";
    if (cartGrandTotal) cartGrandTotal.textContent = "$0.00";
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  // Render items
  if (cartList) {
    cartList.innerHTML = cart.map(item => {
      return `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            
            <div class="cart-item-actions">
              <div class="quantity-controller">
                <button class="qty-btn" onclick="updateQty(${item.id}, -1)" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
                <span class="qty-number">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQty(${item.id}, 1)" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
              </div>
              <button class="remove-item-btn" onclick="removeFromCart(${item.id})" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Calculate prices
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  if (cartGrandTotal) cartGrandTotal.textContent = `$${subtotal.toFixed(2)}`;
  if (checkoutBtn) checkoutBtn.disabled = false;
}

// Quantity change handler
window.updateQty = function (productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    updateCartUI();
  }
};

// Remove item from cart
window.removeFromCart = function (productId) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
  showToast(`Removed "${item.name}" from cart.`, "error");
};

// Open Product Detail Modal
window.openProductDetail = function (productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  activeProduct = product;
  currentDetailSlideIndex = 0;
  const content = document.getElementById('detail-modal-content');
  const modal = document.getElementById('detail-modal-overlay');

  const specsHtml = Object.entries(product.specs || {})
    .map(([key, value]) => `
        <div class="spec-row">
          <span class="spec-label">${key.charAt(0).toUpperCase() + key.slice(1)}:</span>
          <span class="spec-val">${value}</span>
        </div>
    `).join('');

  // Support multiple images
  const images = product.images || [product.image];
  const slidesHtml = images.map((img, index) => `
    <img src="${img}" alt="${product.name} Image ${index + 1}" class="detail-slide-img ${index === 0 ? 'active' : ''}" loading="lazy">
  `).join('');

  const sliderControlsHtml = images.length > 1 ? `
    <button class="slide-nav-btn prev-slide" onclick="changeDetailSlide(-1)" aria-label="Previous image"><i class="fa-solid fa-chevron-left"></i></button>
    <button class="slide-nav-btn next-slide" onclick="changeDetailSlide(1)" aria-label="Next image"><i class="fa-solid fa-chevron-right"></i></button>
    <div class="slide-dots">
      ${images.map((_, index) => `
        <span class="slide-dot ${index === 0 ? 'active' : ''}" onclick="setDetailSlide(${index})"></span>
      `).join('')}
    </div>
  ` : '';

  content.innerHTML = `
    <div class="detail-img-container slider-container">
      <div class="detail-slides">
        ${slidesHtml}
      </div>
      ${sliderControlsHtml}
    </div>
    <div class="detail-content">
      <h2 class="detail-title">${product.name}</h2>
      <span class="detail-category">${product.category}</span>
      <p class="detail-description">${product.description}</p>
      
      <div class="detail-specs">
        ${specsHtml}
      </div>

      <div class="detail-footer" style="flex-direction: column; align-items: flex-start; gap: 12px;">
        <span class="detail-price-inquire" style="font-size: 0.95rem; font-weight: 600; color: var(--accent-pink-deep);"><i class="fa-solid fa-tags"></i> For Price details check with seller</span>
        <button class="add-to-cart-btn" onclick="openInquiryModal(${product.id});" style="padding: 12px 28px; font-size: 0.95rem; width: 100%; justify-content: center;">
          <i class="fa-solid fa-paper-plane"></i> Inquire About Product
        </button>
      </div>
    </div>
  `;

  openModal(modal);
};

// Detail Slide controllers
window.changeDetailSlide = function (direction) {
  const slides = document.querySelectorAll('.detail-slide-img');
  const dots = document.querySelectorAll('.slide-dot');
  if (slides.length <= 1) return;

  slides[currentDetailSlideIndex].classList.remove('active');
  if (dots.length > 0) dots[currentDetailSlideIndex].classList.remove('active');

  currentDetailSlideIndex = (currentDetailSlideIndex + direction + slides.length) % slides.length;

  slides[currentDetailSlideIndex].classList.add('active');
  if (dots.length > 0) dots[currentDetailSlideIndex].classList.add('active');
};

window.setDetailSlide = function (index) {
  const slides = document.querySelectorAll('.detail-slide-img');
  const dots = document.querySelectorAll('.slide-dot');
  if (slides.length <= 1) return;

  slides[currentDetailSlideIndex].classList.remove('active');
  if (dots.length > 0) dots[currentDetailSlideIndex].classList.remove('active');

  currentDetailSlideIndex = index;

  slides[currentDetailSlideIndex].classList.add('active');
  if (dots.length > 0) dots[currentDetailSlideIndex].classList.add('active');
};

// Open Inquiry Modal for a specific product
window.openInquiryModal = function (productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  activeProduct = product;
  
  // Close details modal if open
  closeModal(document.getElementById('detail-modal-overlay'));

  // Update product info in inquiry modal
  const infoEl = document.getElementById('inquiry-modal-product-info');
  if (infoEl) {
    infoEl.innerHTML = `You are inquiring about: <strong style="color: var(--accent-pink-deep);">${product.name}</strong> (${product.specs.scale})`;
  }
  
  // Open checkout/inquiry modal
  openModal(document.getElementById('checkout-modal-overlay'));
};

// Modal helpers
function openModal(modalEl) {
  modalEl.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalEl) {
  modalEl.classList.remove('open');
  document.body.style.overflow = '';
}

// Config Modal Settings loading
function openConfigModal() {
  document.getElementById('config-tg-token').value = config.tgBotToken;
  document.getElementById('config-tg-chatid').value = config.tgChatId;

  document.getElementById('config-emailjs-service').value = config.emailjsServiceId;
  document.getElementById('config-emailjs-template').value = config.emailjsTemplateId;
  document.getElementById('config-emailjs-publickey').value = config.emailjsPublicKey;
  document.getElementById('config-emailjs-recipient').value = config.emailjsRecipient;

  // Active default orders tab on show
  if (document.getElementById('tab-btn-orders')) {
    document.getElementById('tab-btn-orders').click();
  }

  openModal(document.getElementById('config-modal-overlay'));
}

// Save Admin Panel Settings
function handleConfigSave() {
  const newConfig = {
    tgBotToken: document.getElementById('config-tg-token').value.trim(),
    tgChatId: document.getElementById('config-tg-chatid').value.trim(),
    emailjsServiceId: document.getElementById('config-emailjs-service').value.trim(),
    emailjsTemplateId: document.getElementById('config-emailjs-template').value.trim(),
    emailjsPublicKey: document.getElementById('config-emailjs-publickey').value.trim(),
    emailjsRecipient: document.getElementById('config-emailjs-recipient').value.trim()
  };

  saveConfig(newConfig);
  closeModal(document.getElementById('config-modal-overlay'));
}

// Submit Product Inquiry
async function handleCheckoutSubmit(e) {
  e.preventDefault();

  if (!activeProduct) {
    showToast("No active product selected for inquiry.", "error");
    return;
  }

  const loader = document.getElementById('loading-overlay');
  loader.classList.add('active');

  const customerName = document.getElementById('checkout-name').value.trim();
  const customerEmail = document.getElementById('checkout-email').value.trim();
  const customerPhone = document.getElementById('checkout-phone').value.trim();
  const customerAddress = document.getElementById('checkout-address').value.trim(); // Holds custom message

  // Generate unique Inquiry ID
  const today = new Date();
  const dateStr = today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0');
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const inquiryId = `IQ-${dateStr}-${randomNum}`;

  // Prepare template variables for notification alerts
  const orderData = {
    orderId: inquiryId,
    customerName,
    customerEmail,
    customerPhone,
    customerAddress: customerAddress || "No custom message entered.",
    deliveryMethod: 'Product Inquiry Catalog Mode',
    paymentMethod: 'For Price details check with seller',
    itemsText: `Product: ${activeProduct.name}\nCategory: ${activeProduct.category}\nScale: ${activeProduct.specs.scale}`,
    itemsHtml: `<ul><li><strong>Inquiry Product:</strong> ${activeProduct.name} (Category: ${activeProduct.category})</li></ul>`,
    subtotal: 'N/A',
    shipping: 'N/A',
    total: 'For Price details check with seller'
  };

  console.log("Processing Product Inquiry:", orderData);

  // Deliver Alerts
  let telegramSent = false;
  let emailSent = false;

  // 1. Send Telegram Notification
  if (config.tgBotToken && config.tgChatId) {
    try {
      telegramSent = await sendTelegramNotification(orderData);
    } catch (err) {
      console.error("Telegram delivery failure:", err);
    }
  }

  // 2. Send Email Notification
  if (config.emailjsServiceId && config.emailjsTemplateId && config.emailjsPublicKey) {
    try {
      emailSent = await sendEmailNotification(orderData);
    } catch (err) {
      console.error("EmailJS delivery failure:", err);
    }
  }

  // Wait a small bit to simulate network delay for smooth feels
  await new Promise(resolve => setTimeout(resolve, 800));

  // Hide loader
  loader.classList.remove('active');

  // Render receipt in Success Modal
  const receiptBox = document.getElementById('success-receipt-box');
  receiptBox.innerHTML = `
    <div class="receipt-header">
      <span>Inquiry ID: ${inquiryId}</span>
      <span>${today.toLocaleDateString()}</span>
    </div>
    <div class="receipt-items">
      <div class="receipt-row" style="font-weight:600; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 5px; margin-bottom: 8px;">
        <span>Product Inquired</span>
        <span>Details</span>
      </div>
      <div class="receipt-row">
        <span>${activeProduct.name}</span>
        <span>1 Unit</span>
      </div>
      <div class="receipt-row" style="color: var(--accent-pink-deep); margin-top: 10px; border-top: 1px dashed rgba(0,0,0,0.05); padding-top: 8px;">
        <span>Price Status</span>
        <span>For Price details check with seller</span>
      </div>
    </div>
    <div style="font-size:0.75rem; color:var(--text-muted); margin-top:15px; border-top:1px dashed rgba(0,0,0,0.05); padding-top:10px;">
      ${telegramSent ? '<i class="fa-brands fa-telegram" style="color: #229ED9;"></i> Telegram Owner Alert: Delivered. ' : ''}
      ${emailSent ? '<i class="fa-solid fa-envelope" style="color:#10b981;"></i> Owner Notification: Sent.' : ''}
      ${(!telegramSent && !emailSent) ? '<i class="fa-solid fa-triangle-exclamation" style="color:var(--accent-gold);"></i> Notification keys not configured. logged in local console.' : ''}
    </div>
  `;

  // Save inquiry to history
  orders.push({
    orderId: inquiryId,
    date: new Date().toLocaleString(),
    customerName,
    customerEmail,
    customerPhone,
    customerAddress: customerAddress || "No message left.",
    deliveryMethod: 'N/A (Product Inquiry)',
    paymentMethod: 'N/A',
    items: [{ name: activeProduct.name, qty: 1, price: 0 }],
    total: 'Check with seller',
    status: 'Pending'
  });
  saveOrders();

  // Clear Checkout inputs & Close Checkout modal
  document.getElementById('checkout-shipping-form').reset();
  closeModal(document.getElementById('checkout-modal-overlay'));

  // Trigger Success Screen
  openModal(document.getElementById('success-modal-overlay'));
  showToast("Inquiry sent successfully!", "success");
}

// Telegram API Sender Client
async function sendTelegramNotification(order) {
  const url = `https://api.telegram.org/bot${config.tgBotToken}/sendMessage`;

  // Format HTML message
  const text = `
<b>🎏 NEW PRODUCT INQUIRY! (STORE CATALOG)</b>
--------------------------------------
<b>Inquiry ID:</b> <code>${order.orderId}</code>
<b>Date:</b> ${new Date().toLocaleString()}

<b>👤 Customer Details:</b>
• <b>Name:</b> ${order.customerName}
• <b>Email:</b> ${order.customerEmail}
• <b>Phone:</b> ${order.customerPhone}
• <b>Message/Address:</b> ${order.customerAddress}

<b>📦 Inquired Product Details:</b>
${order.itemsText}

<b>💳 Status details:</b>
• <b>Pricing status:</b> <b>${order.total}</b>
--------------------------------------
<i>Sent automatically from Bao & Tiny World Web App.</i>
`;

  const payload = {
    chat_id: config.tgChatId,
    text: text,
    parse_mode: 'HTML'
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (result.ok) {
      console.log("Telegram notification sent successfully.");
      return true;
    } else {
      console.warn("Telegram API error:", result.description);
      return false;
    }
  } catch (e) {
    console.error("Network error sending Telegram notification:", e);
    return false;
  }
}

// EmailJS Client Sender
async function sendEmailNotification(order) {
  // Initialize EmailJS
  emailjs.init(config.emailjsPublicKey);

  // Map fields matching user template variables
  const templateParams = {
    order_id: order.orderId,
    customer_name: order.customerName,
    customer_email: order.customerEmail,
    customer_phone: order.customerPhone,
    customer_address: order.customerAddress,
    delivery_method: order.deliveryMethod,
    payment_method: order.paymentMethod,
    order_details: order.itemsText,
    order_total: order.total,
    admin_email: config.emailjsRecipient
  };

  try {
    const res = await emailjs.send(
      config.emailjsServiceId,
      config.emailjsTemplateId,
      templateParams
    );
    if (res.status === 200) {
      console.log("EmailJS order log delivered successfully.");
      return true;
    }
    return false;
  } catch (err) {
    console.error("EmailJS delivery failed:", err);
    return false;
  }
}

// Toast Notifications popup
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let icon = '<i class="fa-solid fa-circle-info"></i>';
  if (type === 'success') icon = '<i class="fa-solid fa-circle-check"></i>';
  if (type === 'error') icon = '<i class="fa-solid fa-circle-exclamation"></i>';

  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'slideInToast 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Dynamic banner animations: falling sakura petals and image parallax scroll
function initDynamicBanner() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;

  // Set canvas size
  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Sakura petal definition
  const petalCount = 35;
  const petals = [];

  class SakuraPetal {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height; // distribute initially
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = -20;
      this.size = Math.random() * 8 + 6;
      this.speedY = Math.random() * 1.2 + 0.8;
      this.speedX = Math.random() * 0.8 - 0.2;
      this.oscillationSpeed = Math.random() * 0.02 + 0.01;
      this.oscillationDistance = Math.random() * 30 + 15;
      this.oscillationOffset = Math.random() * Math.PI * 2;
      this.rotation = Math.random() * Math.PI;
      this.rotationSpeed = Math.random() * 0.02 - 0.01;
      // Sakura pink colors
      const pinkType = Math.floor(Math.random() * 3);
      if (pinkType === 0) this.color = 'rgba(253, 164, 175, 0.7)'; // soft pink
      else if (pinkType === 1) this.color = 'rgba(251, 113, 133, 0.6)'; // deeper rose
      else this.color = 'rgba(254, 205, 211, 0.75)'; // very light pastel pink
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * this.oscillationSpeed + this.oscillationOffset) * 0.3;
      this.rotation += this.rotationSpeed;

      // Reset when off screen
      if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      
      // Draw standard petal shape using curves
      ctx.beginPath();
      ctx.fillStyle = this.color;
      // Left curve of petal
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-this.size / 2, -this.size / 2, 0, -this.size);
      // Right curve of petal
      ctx.quadraticCurveTo(this.size / 2, -this.size / 2, 0, 0);
      ctx.fill();
      
      // Draw tiny crease shadow
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.15)';
      ctx.lineWidth = 1;
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -this.size * 0.7);
      ctx.stroke();
      
      ctx.restore();
    }
  }

  // Populate petals list
  for (let i = 0; i < petalCount; i++) {
    petals.push(new SakuraPetal());
  }

  // Main animation frame loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(petal => {
      petal.update();
      petal.draw();
    });
    animationFrameId = requestAnimationFrame(animate);
  }
  animate();

  // Slide transition logic for the slideshow
  const slides = document.querySelectorAll('.hero-slideshow .hero-banner-img');
  let currentSlide = 0;
  if (slides.length > 1) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 5000); // Cross-fade slides every 5 seconds
  }

  // Scroll parallax effect on the slideshow container
  const heroSlideshow = document.getElementById('hero-slideshow');
  if (heroSlideshow) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY <= 550) {
        // Move slideshow slower than scroll to create depth
        heroSlideshow.style.transform = `translate3d(0, ${scrollY * 0.25}px, 0)`;
      }
    });
  }
}

// Load orders history from local storage
function loadOrders() {
  const savedOrders = localStorage.getItem('bao_tiny_world_orders');
  if (savedOrders) {
    orders = JSON.parse(savedOrders);
  }
}

// Save orders history to local storage
function saveOrders() {
  localStorage.setItem('bao_tiny_world_orders', JSON.stringify(orders));
}

// Render local orders log in the Store Admin Modal Panel
function renderOrdersHistory() {
  const wrapper = document.getElementById('orders-list-wrapper');
  if (!wrapper) return;

  if (orders.length === 0) {
    wrapper.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; color: var(--primary-sky); margin-bottom: 0.8rem; opacity: 0.6;"></i>
        <h3 style="font-size: 1.1rem; margin-bottom: 4px;">No Orders Placed Yet</h3>
        <p style="font-size: 0.85rem;">When a customer successfully completes checkout, their order details will appear here.</p>
      </div>
    `;
    return;
  }

  // Sort orders descending (newest first)
  const sortedOrders = [...orders].reverse();

  wrapper.innerHTML = sortedOrders.map(order => {
    const itemsHtml = order.items.map(item => `
      <li>
        <span>${item.name} <strong>x${item.qty}</strong></span>
        <span>$${(item.price * item.qty).toFixed(2)}</span>
      </li>
    `).join('');

    const statusClass = order.status === 'Shipped' ? 'status-completed' : 'status-pending';
    const statusText = order.status === 'Shipped' ? 'Shipped' : 'Pending';
    const shipBtnText = order.status === 'Shipped' ? 'Mark Pending' : 'Mark Shipped';

    return `
      <div class="admin-order-card" id="admin-order-${order.orderId}">
        <div class="admin-order-header">
          <div>
            <span class="admin-order-id">${order.orderId}</span>
            <div class="admin-order-date">${order.date}</div>
          </div>
          <span class="status-badge ${statusClass}">${statusText}</span>
        </div>
        
        <div class="admin-order-details">
          <div class="admin-customer-info">
            <h4>Customer Information</h4>
            <p><span>Name:</span> ${order.customerName}</p>
            <p><span>Phone:</span> ${order.customerPhone}</p>
            <p><span>Email:</span> ${order.customerEmail}</p>
            <p><span>Address:</span> ${order.customerAddress}</p>
            <p><span>Payment:</span> ${order.paymentMethod}</p>
          </div>
          <div class="admin-items-info">
            <h4>Order Items</h4>
            <ul class="admin-order-items-list">
              ${itemsHtml}
            </ul>
          </div>
        </div>

        <div class="admin-order-footer">
          <div class="admin-order-total">
            <span>Total Value:</span> $${order.total}
          </div>
          <div class="admin-order-actions">
            <button class="admin-btn admin-btn-ship" onclick="toggleOrderStatus('${order.orderId}')">${shipBtnText}</button>
            <button class="admin-btn admin-btn-delete" onclick="deleteOrderHistory('${order.orderId}')" aria-label="Delete order"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Toggle single order status
window.toggleOrderStatus = function(orderId) {
  const order = orders.find(o => o.orderId === orderId);
  if (!order) return;
  order.status = order.status === 'Shipped' ? 'Pending' : 'Shipped';
  saveOrders();
  renderOrdersHistory();
  showToast(`Order status updated to: ${order.status}`, "success");
};

// Delete single order
window.deleteOrderHistory = function(orderId) {
  if (confirm(`Are you sure you want to delete order ${orderId} from store history?`)) {
    orders = orders.filter(o => o.orderId !== orderId);
    saveOrders();
    renderOrdersHistory();
    showToast("Order removed from database.", "error");
  }
};
