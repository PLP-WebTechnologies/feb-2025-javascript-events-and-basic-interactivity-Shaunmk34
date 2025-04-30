// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // --------------------------
    // 1. Event Handling
    // --------------------------
    
    // Button click event
    const clickButton = document.getElementById('click-button');
    const clickOutput = document.getElementById('click-output');
    
    clickButton.addEventListener('click', function() {
        clickOutput.textContent = "Button was clicked! 🎉";
        clickOutput.style.color = "#2ecc71";
    });
    
    // Hover effect
    const hoverBox = document.querySelector('.hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = "Hover detected! ✨";
        hoverOutput.style.color = "#3498db";
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = "Waiting for hover...";
        hoverOutput.style.color = "";
    });
    
    // Keypress detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    let keypressCount = 0;
    
    keypressInput.addEventListener('keypress', function() {
        keypressCount++;
        keypressOutput.textContent = `Key presses: ${keypressCount}`;
        
        // Change color based on count
        const hue = (keypressCount * 10) % 360;
        keypressOutput.style.color = `hsl(${hue}, 80%, 50%)`;
    });
    
    // Secret action (double click or long press)
    const secretBox = document.querySelector('.secret-box');
    const secretOutput = document.getElementById('secret-output');
    let longPressTimer;
    
    // Double click
    secretBox.addEventListener('dblclick', function() {
        secretOutput.textContent = "You found the double-click secret! 🎊";
        secretOutput.style.color = "#9b59b6";
    });
    
    // Long press
    secretBox.addEventListener('mousedown', function() {
        longPressTimer = setTimeout(function() {
            secretOutput.textContent = "Long press detected! You're persistent! 💪";
            secretOutput.style.color = "#e67e22";
        }, 1000); // 1 second for long press
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(longPressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(longPressTimer);
    });
    
    // --------------------------
    // 2. Interactive Elements
    // --------------------------
    
    // Color changing button
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color changed to ${colors[colorIndex]}`;
    });
    
    // Image gallery
    const galleryImage = document.getElementById('gallery-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const images = [
        'https://picsum.photos/id/237/400/300',
        'https://picsum.photos/id/238/400/300',
        'https://picsum.photos/id/239/400/300',
        'https://picsum.photos/id/240/400/300'
    ];
    let currentImageIndex = 0;
    
    function updateGalleryImage() {
        galleryImage.src = images[currentImageIndex];
        galleryImage.alt = `Gallery image ${currentImageIndex + 1}`;
    }
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGalleryImage();
        // Add animation
        galleryImage.style.animation = 'none';
        void galleryImage.offsetWidth; // Trigger reflow
        galleryImage.style.animation = 'fadeIn 0.5s';
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGalleryImage();
        // Add animation
        galleryImage.style.animation = 'none';
        void galleryImage.offsetWidth; // Trigger reflow
        galleryImage.style.animation = 'fadeIn 0.5s';
    });
    
    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // --------------------------
    // 3. Form Validation
    // --------------------------
    const userForm = document.getElementById('user-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const passwordStrength = document.getElementById('password-strength');
    const formStatus = document.getElementById('form-status');
    
    // Real-time validation
    usernameInput.addEventListener('input', validateUsername);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateUsername() {
        if (usernameInput.value.trim() === '') {
            usernameError.textContent = 'Username is required';
            usernameError.style.display = 'block';
            return false;
        } else if (usernameInput.value.length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters';
            usernameError.style.display = 'block';
            return false;
        } else {
            usernameError.style.display = 'none';
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            emailError.style.display = 'block';
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            return false;
        } else {
            emailError.style.display = 'none';
            return true;
        }
    }
    
    function validatePassword() {
        if (passwordInput.value.trim() === '') {
            passwordError.textContent = 'Password is required';
            passwordError.style.display = 'block';
            updatePasswordStrength(0);
            return false;
        } else if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordError.style.display = 'block';
            updatePasswordStrength(passwordInput.value.length / 8 * 33);
            return false;
        } else {
            passwordError.style.display = 'none';
            
            // Calculate password strength
            let strength = 0;
            if (passwordInput.value.length >= 8) strength += 33;
            if (/[A-Z]/.test(passwordInput.value)) strength += 33;
            if (/[0-9!@#$%^&*]/.test(passwordInput.value)) strength += 34;
            
            updatePasswordStrength(strength);
            return true;
        }
    }
    
    function updatePasswordStrength(strength) {
        const strengthBar = passwordStrength.querySelector('::after') || passwordStrength;
        
        if (strength < 33) {
            passwordStrength.style.setProperty('--strength-color', '#e74c3c');
        } else if (strength < 66) {
            passwordStrength.style.setProperty('--strength-color', '#f39c12');
        } else {
            passwordStrength.style.setProperty('--strength-color', '#2ecc71');
        }
        
        passwordStrength.style.setProperty('--strength-width', `${strength}%`);
    }
    
    // Form submission
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isUsernameValid && isEmailValid && isPasswordValid) {
            formStatus.textContent = 'Form submitted successfully! 🎉';
            formStatus.style.color = '#2ecc71';
            
            // Reset form after 2 seconds
            setTimeout(() => {
                userForm.reset();
                formStatus.textContent = '';
                passwordStrength.style.setProperty('--strength-width', '0%');
            }, 2000);
        } else {
            formStatus.textContent = 'Please fix the errors above';
            formStatus.style.color = '#e74c3c';
        }
    });
});
