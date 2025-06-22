
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}


const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


document.querySelectorAll('.feature-card, .integration-grid img, .hero-content, .hero-image').forEach(el => {
    observer.observe(el);
});


const paymentMethods = document.querySelectorAll('.payment-methods img');
paymentMethods.forEach(method => {
    method.addEventListener('mouseenter', () => {
        method.style.transform = 'scale(1.1)';
    });
    method.addEventListener('mouseleave', () => {
        method.style.transform = 'scale(1)';
    });
});

const integrationLogos = document.querySelectorAll('.integration-grid img');
integrationLogos.forEach(logo => {
    logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'scale(1.1)';
    });
    logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'scale(1)';
    });
});

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const signupSteps = document.querySelectorAll('.step');
    const formSections = document.querySelectorAll('.signup-form-section');
    const continueBtn1 = document.getElementById('continue-btn');
    const setPasswordBtn = document.getElementById('set-password-btn');
    const createAccountBtn = document.getElementById('create-account-btn');

    const emailInput = document.getElementById('email-address');
    const emailError = document.getElementById('email-error');

    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const confirmPasswordError = document.getElementById('confirm-password-error');

    const fullNameInput = document.getElementById('full-name');
    const fullNameError = document.getElementById('full-name-error');

    let currentStep = 1;

    function updateProgress(stepNumber) {
        signupSteps.forEach((step, index) => {
            if (index + 1 === stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    function showFormSection(stepNumber) {
        formSections.forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(`step-${stepNumber}-content`).classList.remove('hidden');
    }

    function validateEmail() {
        const email = emailInput.value;
        if (!email) {
            emailError.textContent = 'Email address is required.';
            return false;
        } else if (!/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            emailError.textContent = 'Please enter a valid email address.';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }

    function validatePassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        let isValid = true;

        if (!password) {
            passwordError.textContent = 'Password is required.';
            isValid = false;
        } else if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters long.';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }

        if (!confirmPassword) {
            confirmPasswordError.textContent = 'Confirm password is required.';
            isValid = false;
        } else if (password !== confirmPassword) {
            confirmPasswordError.textContent = 'Passwords do not match.';
            isValid = false;
        } else {
            confirmPasswordError.textContent = '';
        }
        return isValid;
    }

    function validateFullName() {
        const fullName = fullNameInput.value;
        if (!fullName) {
            fullNameError.textContent = 'Full Name is required.';
            return false;
        } else {
            fullNameError.textContent = '';
            return true;
        }
    }

    if (continueBtn1) {
        continueBtn1.addEventListener('click', function(event) {
            event.preventDefault();
            if (validateEmail()) {
                currentStep = 2;
                updateProgress(currentStep);
                showFormSection(currentStep);
            }
        });
    }

    if (setPasswordBtn) {
        setPasswordBtn.addEventListener('click', function(event) {
            event.preventDefault();
            if (validatePassword()) {
                currentStep = 3;
                updateProgress(currentStep);
                showFormSection(currentStep);
            }
        });
    }

    if (createAccountBtn) {
        createAccountBtn.addEventListener('click', function(event) {
            event.preventDefault();
            if (validateFullName()) {
                currentStep = 4;
                updateProgress(currentStep);
                showFormSection(currentStep);
            }
        });
    }

    // Initial setup
    updateProgress(currentStep);
    showFormSection(currentStep);
}); 
