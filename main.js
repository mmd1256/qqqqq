// مدیریت سبد خرید
document.addEventListener('DOMContentLoaded', function() {
    // متغیرهای سبد خرید
    let cart = [];
    let cartCount = 0;
    
    // انتخاب المان‌های مورد نیاز
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountElement = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const cartButton = document.getElementById('cart-button');
    const closeButton = document.querySelector('.close');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-button');
    
    // اضافه کردن رویداد کلیک به دکمه‌های افزودن به سبد خرید
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product');
            const productId = product.dataset.id;
            const productName = product.dataset.name;
            const productPrice = parseInt(product.dataset.price);
            
            // بررسی اگر محصول قبلاً در سبد خرید وجود دارد
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }
            
            // به‌روزرسانی تعداد آیتم‌های سبد خرید
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // نمایش پیام موفقیت
            showNotification(`${productName} به سبد خرید اضافه شد`);
            
            // به‌روزرسانی نمایش سبد خرید
            updateCartDisplay();
        });
    });
    
    // نمایش پیام اعلان
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // حذف اعلان بعد از 3 ثانیه
        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
    
    // به‌روزرسانی نمایش سبد خرید
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>سبد خرید شما خالی است</p>';
            totalPriceElement.textContent = '0';
            return;
        }
        
        let totalPrice = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>قیمت: ${formatPrice(item.price)} تومان</p>
                    <div class="quantity-control">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                    </div>
                </div>
                <div class="item-total">
                    <p>${formatPrice(itemTotal)} تومان</p>
                    <button class="remove-item" data-id="${item.id}">حذف</button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        totalPriceElement.textContent = formatPrice(totalPrice);
        
        // اضافه کردن رویدادها به دکمه‌های کنترل تعداد
        addQuantityControlEvents();
    }
    
    // اضافه کردن رویدادها به دکمه‌های کنترل تعداد
    function addQuantityControlEvents() {
        // دکمه‌های افزایش تعداد
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.dataset.id;
                const item = cart.find(item => item.id === itemId);
                
                if (item) {
                    item.quantity += 1;
                    cartCount++;
                    cartCountElement.textContent = cartCount;
                    updateCartDisplay();
                }
            });
        });
        
        // دکمه‌های کاهش تعداد
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.dataset.id;
                const item = cart.find(item => item.id === itemId);
                
                if (item && item.quantity > 1) {
                    item.quantity -= 1;
                    cartCount--;
                    cartCountElement.textContent = cartCount;
                    updateCartDisplay();
                }
            });
        });
        
        // دکمه‌های حذف آیتم
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.dataset.id;
                const itemIndex = cart.findIndex(item => item.id === itemId);
                
                if (itemIndex !== -1) {
                    const removedItem = cart[itemIndex];
                    cartCount -= removedItem.quantity;
                    cartCountElement.textContent = cartCount;
                    
                    cart.splice(itemIndex, 1);
                    updateCartDisplay();
                }
            });
        });
    }
    
    // فرمت‌بندی قیمت
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // نمایش مدال سبد خرید
    cartButton.addEventListener('click', function(e) {
        e.preventDefault();
        cartModal.style.display = 'block';
        updateCartDisplay();
    });
    
    // بستن مدال سبد خرید
    closeButton.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });
    
    // بستن مدال با کلیک خارج از محتوا
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // دکمه تکمیل خرید
    checkoutButton.addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('سبد خرید شما خالی است');
            return;
        }
        
        // در اینجا می‌توانید کد مربوط به پردازش خرید را اضافه کنید
        alert('سفارش شما با موفقیت ثبت شد!');
        
        // خالی کردن سبد خرید
        cart = [];
        cartCount = 0;
        cartCountElement.textContent = '0';
        updateCartDisplay();
        cartModal.style.display = 'none';
    });
});
// کد مربوط به نوار جستجوی پنهان
document.addEventListener('DOMContentLoaded', function() {
    // متغیرهای اصلی
    const searchTrigger = document.getElementById('search-trigger');
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const closeSearch = document.getElementById('close-search');
    const searchResultsList = document.getElementById('search-results-list');
    const noResults = document.getElementById('no-results');
    const searchLoading = document.querySelector('.search-loading');
    
    // باز و بسته کردن منوی جستجو
    searchTrigger.addEventListener('click', function() {
        searchContainer.classList.add('active');
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    });
    
    closeSearch.addEventListener('click', function() {
        searchContainer.classList.remove('active');
        // پاک کردن نتایج
        searchInput.value = '';
        searchResultsList.innerHTML = '';
        noResults.style.display = 'none';
    });
    
    // بستن با کلیک خارج از نوار جستجو
    document.addEventListener('click', function(event) {
        const isClickInside = searchContainer.contains(event.target) || searchTrigger.contains(event.target);
        
        if (!isClickInside && searchContainer.classList.contains('active')) {
            searchContainer.classList.remove('active');
        }
    });
    
    // جلوگیری از بسته شدن با کلیک داخل نوار جستجو
    searchContainer.addEventListener('click', function(event) {
        event.stopPropagation();
    });
    
    // جستجو با تایپ (زنده)
    let debounceTimeout;
    
    searchInput.addEventListener('input', function() {
        const searchQuery = this.value.trim();
        
        // پاک کردن تایمر قبلی
        clearTimeout(debounceTimeout);
        
        if (searchQuery.length > 1) {
            // نمایش لودر
            searchLoading.style.display = 'flex';
            noResults.style.display = 'none';
            searchResultsList.innerHTML = '';
            
            // تاخیر در جستجو برای عملکرد بهتر
            debounceTimeout = setTimeout(function() {
                performSearch(searchQuery);
            }, 300);
        } else {
            searchResultsList.innerHTML = '';
            searchLoading.style.display = 'none';
            noResults.style.display = 'none';
        }
    });
    
    // جستجو با کلیک روی دکمه
    searchButton.addEventListener('click', function() {
        const searchQuery = searchInput.value.trim();
        
        if (searchQuery.length > 1) {
            performSearch(searchQuery);
        }
    });
    
    // جستجو با فشردن کلید Enter
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const searchQuery = searchInput.value.trim();
            
            if (searchQuery.length > 1) {
                performSearch(searchQuery);
            }
        }
    });
    
    // تابع اصلی جستجو
    function performSearch(query) {
        // نمایش لودر
        searchLoading.style.display = 'flex';
        searchResultsList.innerHTML = '';
        noResults.style.display = 'none';
        
        // شبیه‌سازی تاخیر در دریافت نتایج (برای نمایش لودر)
        setTimeout(function() {
            // جمع‌آوری تمام محصولات در صفحه
            const products = document.querySelectorAll('.product');
            const results = [];
            
            // جستجو در محصولات
            products.forEach(product => {
                const productName = product.dataset.name || product.querySelector('h3').innerText;
                const productDescription = product.querySelector('.description')?.innerText || '';
                const productPrice = product.dataset.price || product.querySelector('.price')?.innerText || '';
                const productImage = product.querySelector('img').src;
                
                // بررسی تطبیق با عبارت جستجو
                if (
                    productName.toLowerCase().includes(query.toLowerCase()) ||
                    productDescription.toLowerCase().includes(query.toLowerCase())
                ) {
                    // حذف تکرارها با بررسی نام محصول
                    if (!results.some(item => item.name === productName)) {
                        results.push({
                            name: productName,
                            description: productDescription,
                            price: productPrice,
                            image: productImage,
                            element: product
                        });
                    }
                }
            });
            
            // مخفی کردن لودر
            searchLoading.style.display = 'none';
            
            // نمایش نتایج یا پیام عدم نتیجه
            if (results.length > 0) {
                results.forEach(result => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'search-result-item';
                    
                    // هایلایت کردن عبارت جستجو
                    const highlightedName = highlightText(result.name, query);
                    const highlightedDesc = highlightText(result.description, query);
                    
                    resultItem.innerHTML = `
                        <img src="${result.image}" alt="${result.name}">
                        <div class="result-info">
                            <h4>${highlightedName}</h4>
                            <p class="description">${highlightedDesc}</p>
                        </div>
                        <div class="result-price">${result.price}</div>
                    `;
                    
                    // کلیک روی نتیجه جستجو
                    resultItem.addEventListener('click', function() {
                        searchContainer.classList.remove('active');
                        // اسکرول به محصول مورد نظر
                        result.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        
                        // افکت هایلایت برای محصول یافت شده
                        result.element.classList.add('highlight-product');
                        setTimeout(() => {
                            result.element.classList.remove('highlight-product');
                        }, 2000);
                    });
                    
                    searchResultsList.appendChild(resultItem);
                });
            } else {
                noResults.style.display = 'flex';
            }
        }, 500);
    }
    
    // تابع هایلایت کردن عبارت جستجو
    function highlightText(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }
    
    // تابع کمکی برای escape کردن کاراکترهای خاص در regex
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    // اضافه کردن استایل برای هایلایت کردن محصول یافت شده
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes highlight-pulse {
            0% { box-shadow: 0 0 0 0 rgba(40, 40, 184, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(40, 40, 184, 0); }
            100% { box-shadow: 0 0 0 0 rgba(40, 40, 184, 0); }
        }
        
        .highlight-product {
            animation: highlight-pulse 1.5s ease-out;
            border: 2px solid #2828b8;
        }
    `;
    document.head.appendChild(style);
});
