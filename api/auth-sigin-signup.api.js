document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('#ragisterForm');
    const loginForm = document.querySelector('#login-form');

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

async function handleRegister(event) {
    event.preventDefault();

    const firstName = document.querySelector('#firstName').value.trim();
    const lastName = document.querySelector('#lastName').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const number = document.querySelector('#number').value.trim();

    if (!firstName || !lastName || !email || !number || !password) {
        alert('All fields are required!');
        return;
    }

    const formData = { firstName, lastName, email, number, password };

    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok && result.success) {
            localStorage.setItem('token', result.token);
            alert('Registration successful!');
            window.location.href = './index.html';
        } else {
            alert(result.message || 'Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during registration:', error.message);
        alert('Failed to register. Please try again later.');
    }
}

async function handleLogin(event) {
    event.preventDefault();

    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    const loginData = { email, password };

    try {
        const response = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || 'Login failed.');
        }

        localStorage.setItem('token', `Bearer ${result.token}`);

        // 👇 Check if user is admin
        const adminResponse = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const adminResult = await adminResponse.json();

        if (adminResponse.ok && adminResult.message === "Admin is logged in") {
            alert('Admin logged in');
            window.location.href = './admin-dashboard.html';
        } else {
            window.location.href = './index.html';
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        alert('Something went wrong. Please try again.');
    }
}
