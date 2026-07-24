const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle?.setAttribute('aria-expanded', 'false');
        if (menuToggle) menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

const filterButtons = document.querySelectorAll('.filter');
const dishes = document.querySelectorAll('.dish');

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const category = button.dataset.filter;
        filterButtons.forEach((item) => item.classList.toggle('active', item === button));
        dishes.forEach((dish) => {
            const shouldShow = category === 'all' || dish.dataset.category === category;
            dish.classList.toggle('is-hidden', !shouldShow);
        });
    });
});

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');

contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = contactForm.elements.name.value.trim();
    formStatus.textContent = `Thanks${name ? `, ${name}` : ''}! Your message has been received.`;
    contactForm.reset();
});

const sections = document.querySelectorAll('main section[id], header[id]');
const navigationItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navigationItems.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
    });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));
