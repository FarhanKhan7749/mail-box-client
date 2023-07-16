
import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from './SignUp';

describe('Login Component', () => {
  test('renders the SignUp component', () => {
    render(<SignUp />);
    const signUpElement = screen.getByRole('heading', { name: /Login/i });
    expect(signUpElement).toBeInTheDocument();
  });
});

describe('Signup Component', () => {
   test('renders the SignUp component with SignUp heading', () => {
    render(<SignUp />);
    const toggleButton = screen.getByText(/Create new account/i);
    fireEvent.click(toggleButton);
    const signUpElement = screen.getByRole('heading', { name: /SignUp/i });
    expect(signUpElement).toBeInTheDocument();
  });
});

describe('invalid email format', () => {
  test('displays error message for invalid email format', () => {
    render(<SignUp />);
    const emailInput = screen.getByPlaceholderText(/Email/i);

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });

    // Get all elements with the text "Login"
    const loginElements = screen.getAllByText(/Login/i);
    // Select the login button from the array of elements
    const signUpButton = loginElements.find((element) => element.tagName === 'BUTTON');

    fireEvent.click(signUpButton);

    const errorMessage = screen.getByText(/Invalid email format/i);
    expect(errorMessage).toBeInTheDocument();
  });
});

describe('invalid email format', () => {
  test('displays error message for invalid email format', () => {
    render(<SignUp />);
    const emailInput = screen.getByPlaceholderText(/Email/i);

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });

    // Get all elements with the text "Login"
    const loginElements = screen.getAllByText(/Login/i);
    // Select the login button from the array of elements
    const signUpButton = loginElements.find((element) => element.tagName === 'BUTTON');

    fireEvent.click(signUpButton);

    const errorMessage = screen.getByText(/Invalid email format/i);
    expect(errorMessage).toBeInTheDocument();
  });
});

describe('password mismatch', () => {
  test('displays error message for password mismatch', () => {
    render(<SignUp />);
    const toggleButton = screen.getByText(/Create new account/i);
    fireEvent.click(toggleButton);

    // Find the SignUp button by its role
    const signUpButton = screen.getByRole('button', { name: /Sign up/i });
    fireEvent.click(signUpButton);
    const passwordInputs = screen.getAllByPlaceholderText(/Enter password/i);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];
  });
});

// describe('password mismatch', () => {
//   test('displays error message for password mismatch', () => {
//     render(<SignUp />);
//     const toggleButton = screen.getByText(/Create new account/i);
//     fireEvent.click(toggleButton);

//     // Find the sign-up button by its role
//     const signUpButton = screen.getByRole('button', { name: /Sign up/i });

//     const passwordInputs = screen.getAllByPlaceholderText(/Enter password/i);
//     const passwordInput = passwordInputs[0];
//     const confirmPasswordInput = passwordInputs[1];

//     fireEvent.type(passwordInput, 'password123');
//     fireEvent.type(confirmPasswordInput, 'password456');
//     fireEvent.click(signUpButton);

//     const errorMessage = screen.getByText(/Passwords do not match/i);
//     expect(errorMessage).toBeInTheDocument();
//   });
// });

  // describe('Authentication failed', () => {
  //   test('displays error message after failed signup', async () => {
  //       render(<SignUp />);
  //       const emailInput = screen.getByPlaceholderText(/Email/i);
  //       const passwordInputs = screen.getAllByPlaceholderText(/Password/i);
  //       const signUpButton = screen.getByText(/Sign up/i);
    
  //       fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  //       fireEvent.change(passwordInputs[0], { target: { value: 'password123' } });
  //       fireEvent.change(passwordInputs[1], { target: { value: 'password123' } });
    
  //       const fetchMock = jest.fn().mockResolvedValue({
  //         ok: false,
  //       });
    
  //       global.fetch = fetchMock;
    
  //       fireEvent.click(signUpButton);
    
  //       const errorMessage = await screen.findByText(/Authentication failed/i);
  //       expect(errorMessage).toBeInTheDocument();
  //     });
    
  // });