document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const createMobileMenu = () => {
        const sidebar = document.querySelector('.sidebar');
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        document.querySelector('.content-header').prepend(menuToggle);
        
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    };

    // Check if mobile view
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-toggle')) {
                createMobileMenu();
            }
        } else {
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            if (menuToggle) {
                menuToggle.remove();
            }
            document.querySelector('.sidebar').classList.remove('active');
        }
    });

    // Add active state to current section in sidebar
    const updateActiveSection = () => {
        const sections = document.querySelectorAll('.menu-section a');
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const targetId = section.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const sectionTop = targetElement.offsetTop;
                const sectionBottom = sectionTop + targetElement.offsetHeight;

                if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionBottom) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Initial check

    // Handle Postman button click
    const postmanButton = document.querySelector('.postman-section .btn-primary');
    if (postmanButton) {
        postmanButton.addEventListener('click', () => {
            // Add your Postman collection URL here
            window.open('https://www.postman.com/quickpay', '_blank');
        });
    }

    // Handle sign up and login buttons
    const signUpButton = document.querySelector('.header-actions .btn-primary');
    const loginButton = document.querySelector('.header-actions .btn-secondary');

    if (signUpButton) {
        signUpButton.addEventListener('click', () => {
            window.location.href = 'signup.html';
        });
    }

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }
}); 