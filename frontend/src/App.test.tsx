import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
    it('renders login form', () => {
        render(<App />)
        const loginForm = screen.getByText(/login/i)
        expect(loginForm).toBeInTheDocument()
    })
})

// test('renders learn react link', () => {
//     render(<App />)
//     const linkElement = screen.getByText(/learn react/i)
//     expect(linkElement).toBeInTheDocument()
// })
