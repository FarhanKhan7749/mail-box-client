import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from './SignUp';

describe('SignUp Component', () => {
  test('renders the SignUp component', () => {
    render(<SignUp />);
    const signUpElement = screen.getByText(/SignUp/i);
    expect(signUpElement).toBeInTheDocument();
  });
});

describe('SignUp Password', () => {
    test('displays error message for password mismatch', () => {
        render(<SignUp />);
        const passwordInputs = screen.getAllByPlaceholderText(/Password/i);
        const signUpButton = screen.getByText(/Sign up/i);
    
        const passwordInput = passwordInputs[0];
        const confirmPasswordInput = passwordInputs[1];
    
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
        fireEvent.click(signUpButton);
    
        const errorMessage = screen.getByText(/Passwords do not match/i);
        expect(errorMessage).toBeInTheDocument();
      });
  });


  describe('SignUp email', () => {
    test('displays error message for invalid email format', () => {
        render(<SignUp />);
        const emailInput = screen.getByPlaceholderText(/Email/i);
        const signUpButton = screen.getByText(/Sign up/i);
    
        fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
        fireEvent.click(signUpButton);
    
        const errorMessage = screen.getByText(/Invalid email format/i);
        expect(errorMessage).toBeInTheDocument();
      });
  });

  describe('successful signup', () => {
    test('displays success message after successful signup', async () => {
        render(<SignUp />);
        const emailInput = screen.getByPlaceholderText(/Email/i);
        const passwordInputs = screen.getAllByPlaceholderText(/Password/i);
        const signUpButton = screen.getByText(/Sign up/i);
    
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInputs[0], { target: { value: 'password123' } });
        fireEvent.change(passwordInputs[1], { target: { value: 'password123' } });
    
        const fetchMock = jest.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve({ message: 'Signup successful' }),
        });
    
        global.fetch = fetchMock;
    
        fireEvent.click(signUpButton);
      });  
  });
  
  describe('Authentication failed', () => {
    test('displays error message after failed signup', async () => {
        render(<SignUp />);
        const emailInput = screen.getByPlaceholderText(/Email/i);
        const passwordInputs = screen.getAllByPlaceholderText(/Password/i);
        const signUpButton = screen.getByText(/Sign up/i);
    
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInputs[0], { target: { value: 'password123' } });
        fireEvent.change(passwordInputs[1], { target: { value: 'password123' } });
    
        const fetchMock = jest.fn().mockResolvedValue({
          ok: false,
        });
    
        global.fetch = fetchMock;
    
        fireEvent.click(signUpButton);
    
        const errorMessage = await screen.findByText(/Authentication failed/i);
        expect(errorMessage).toBeInTheDocument();
      });
    
  });