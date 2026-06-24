const API_URL = 'http://localhost:5000/api/auth'; // Sync with backend port layout settings

export const authService = {
    async login(email, password) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) throw new Error('Invalid signature validation logs matching credentials');
        return response.json();
    },

    async registerCustomer(payload) {
        const response = await fetch(`${API_URL}/register/customer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('Customer profile registration conflict initialization error');
        return response.json();
    },

    async registerVendor(payload) {
        const response = await fetch(`${API_URL}/register/vendor`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('Vendor workspace submission configuration failed');
        return response.json();
    },

    async forgotPassword(email) {
        const response = await fetch(`${API_URL}/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        return response.json();
    }
};