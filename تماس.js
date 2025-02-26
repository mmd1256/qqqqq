document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formErrors = document.getElementById('formErrors');
    
    // اعتبارسنجی شماره تلفن
    function validatePhone(phone) {
        const phoneRegex = /^(09|\+989)\d{9}$/;
        return phoneRegex.test(phone);
    }
    
    // اعتبارسنجی ایمیل
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // نمایش خطاها
    function showErrors(errors) {
        formErrors.innerHTML = '';
        formErrors.classList.add('show');
        
        const errorList = document.createElement('ul');
        errors.forEach(error => {
            const listItem = document.createElement('li');
            listItem.textContent = error;
            errorList.appendChild(listItem);
        });
        
        formErrors.appendChild(errorList);
    }
    
    // پاک کردن خطاها
    function clearErrors() {
        formErrors.innerHTML = '';
        formErrors.classList.remove('show');
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();
        
        const fullname = document.getElementById('fullname').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const privacy = document.getElementById('privacy').checked;
        
        const errors = [];
        
        // بررسی فیلدهای اجباری
        if (!fullname) {
            errors.push('لطفاً نام و نام خانوادگی خود را وارد کنید');
        }
        
        if (!phone) {
            errors.push('لطفاً شماره تماس خود را وارد کنید');
        } else if (!validatePhone(phone)) {
            errors.push('لطفاً یک شماره تماس معتبر وارد کنید');
        }
        
        if (!email) {
            errors.push('لطفاً ایمیل خود را وارد کنید');
        } else if (!validateEmail(email)) {
            errors.push('لطفاً یک ایمیل معتبر وارد کنید');
        }
        
        if (!subject) {
            errors.push('لطفاً موضوع پیام خود را وارد کنید');
        }
        
        if (!message) {
            errors.push('لطفاً پیام خود را وارد کنید');
        }
        
        if (!privacy) {
            errors.push('لطفاً با قوانین حریم خصوصی موافقت کنید');
        }
        
        if (errors.length > 0) {
            showErrors(errors);
            return;
        }
        
        // ارسال فرم
        alert('پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.');
        contactForm.reset();
        
        // در حالت واقعی، اینجا کد ارسال اطلاعات به سرور قرار می‌گیرد
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         fullname,
        //         phone,
        //         email,
        //         subject,
        //         message
        //     })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     alert('پیام شما با موفقیت ارسال شد');
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     showErrors(['خطا در ارسال پیام. لطفاً دوباره تلاش کنید.']);
        // });
    });
});
