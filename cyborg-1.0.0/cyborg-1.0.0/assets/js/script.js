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
        e.preventDefault(); // Evita la recarga de la página
        
        const username = this.username.value.trim();
        const email = this.email.value.trim();
        const password = this.password.value.trim();

        if (!username || !email || !password) {
            alert("⚠️ Todos los campos son obligatorios.");
            return;
        }

        if (users.some(user => user.username === username)) {
            alert("⚠️ El usuario ya existe. Intenta con otro.");
            return;
        }

        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
        this.reset();
    });

    document.querySelector('.sing-in form').addEventListener('submit', function (e) {
        e.preventDefault(); // Evita la recarga de la página
        
        const username = this.username.value.trim();
        const password = this.password.value.trim();

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            alert("✅ Inicio de sesión exitoso.");
            window.location.href = "index.html"; // Simula un inicio de sesión
        } else {
            alert("❌ Usuario o contraseña incorrectos.");
        }
    });
});
