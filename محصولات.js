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
