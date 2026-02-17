function apiBase() {
    try {
        return localStorage.getItem('stitch_api_base') || (typeof window !== 'undefined' && window.STITCH_API_BASE) || 'http://localhost:3000';
    } catch {
        return 'http://localhost:3000';
    }
}

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.toLowerCase();
    const password = document.getElementById('password').value;
    fetch(`${apiBase()}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    }).then(r => r.json()).then(resp => {
        if (!resp.success) {
            throw new Error('Invalid credentials');
        }
        const data = resp.data;
        localStorage.setItem('stitch_token', data.access_token);
        localStorage.setItem('stitch_role', data.user.role);
        localStorage.setItem('stitch_user', JSON.stringify(data.user));
        if (data.user.role === 'SUPER_ADMIN') {
            window.location.href = '../super_admin_dashboard/index.html';
        } else if (data.user.role === 'MANAGER') {
            window.location.href = '../merchant_dashboard/index.html';
        } else if (data.user.role === 'STAFF') {
            window.location.href = '../merchant_dashboard/index.html';
        } else {
            window.location.href = '../auth_login_page/index.html';
        }
    }).catch(() => {
        alert('Login failed. Use demo:\n- admin@stitch.cafe\n- merchant@cafe.com\n- staff@cafe.com\nPassword: password123');
    });
});

function fillLogin(email) {
    document.getElementById('email').value = email;
    document.getElementById('password').value = 'password123';
}
