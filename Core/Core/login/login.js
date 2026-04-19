// LOGIN LOGIC - Avers Admin Panel g yazdi
// dashboarda kecir gizlar (на уровень выше из папки login)
function goToAdmin(e) {
    e.preventDefault();
    // ../ -  login pfpkfdfn cixir в AdminPanel
    window.location.href = 'AdminPanel/pages/dashboard.html';
}

// g yazdi parol gosterir
function togglePassword() {
    const input = document.getElementById('password');
    
    if (input.type === 'password') {
        input.type = 'text';
        event.target.classList.remove('fa-eye');
        event.target.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        event.target.classList.remove('fa-eye-slash');
        event.target.classList.add('fa-eye');
    }
}