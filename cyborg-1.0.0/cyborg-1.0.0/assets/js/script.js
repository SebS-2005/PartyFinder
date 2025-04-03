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
    const users = JSON.parse(localStorage.getItem("users")) || [];

    document.querySelector('.sing-up form').addEventListener('submit', function (e) {
        e.preventDefault();
        
        const username = this.username.value.trim();
        const email = this.email.value.trim();
        const password = this.password.value.trim();

        if (users.some(user => user.username === username)) {
            alert("⚠️ El usuario ya está registrado. Intenta con otro nombre.");
            return;
        }

        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
        this.reset();
    });

    document.querySelector('.sing-in form').addEventListener('submit', function (e) {
        e.preventDefault();
        
        const username = this.username.value.trim();
        const password = this.password.value.trim();

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            alert("✅ Inicio de sesión exitoso.");
            window.location.href = "index.html"; // Redirige después del login
        } else {
            alert("❌ Usuario o contraseña incorrectos.");
        }
    });
});

