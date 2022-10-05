const apiBaseUrl = 'http://localhost:5000/api/auth'
class AuthService {
    private _token: string

    constructor() {
        this._token = localStorage.getItem('token') ?? ''
    }

    get token() {
        return this._token
    }

    set token(token: string) {
        this._token = token
        localStorage.setItem('token', token)
    }

    get isAuthenticated() {
        return !!this._token
    }

    async login(email: string, password: string) {
        const response = await fetch(`${apiBaseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        const data = await response.json()

        if (data.token) {
            this.token = data.token
        }

        return data
    }

    async register(name: string, email: string, password: string, confirmPassword: string) {
        const response = await fetch(`${apiBaseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, confirmPassword }),
        })

        const data = await response.json()
        if (response.ok) {
            // if (data.token) {
            //     this.token = data.token
            // }

            return data
        } else {
            return data
        }
    }
}

export default new AuthService()
