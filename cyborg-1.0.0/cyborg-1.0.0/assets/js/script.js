const singinbtnlink = document.querySelector('.singinbtn-link');
const singupbtnlink = document.querySelector('.singupbtn-link');
const wrapper = document.querySelector('.wrapper');

singupbtnlink.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.classList.toggle('active');
});

singinbtnlink.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.classList.toggle('active');
});

const menuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});


document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('show');
        }, index * 300); // Retraso de 300ms entre cada tarjeta
    });
});
