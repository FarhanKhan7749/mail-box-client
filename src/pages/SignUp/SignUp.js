import { Button } from 'react-bootstrap';
import { useRef, useState } from 'react';

import classes from './SignUp.module.css';

const SignUp = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordRef = useRef();
    const [error, setError] = useState('');

    const submitHandler = async (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordRef.current.value;

        if (enteredPassword !== enteredConfirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        // not working beacuse of the type in input of the email "type="email"".
        if (!enteredEmail.includes('@')) {
            setError('Invalid email format');
            return;
        }


        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDzI3X4meYRgtEVaHG61zbqlBwcbPScHQo', {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                console.log("User has successfully signed up.");
            } else {
                setError('Authentication failed');
            }
        } catch (error) {
            setError('Something went wrong. Please try again later.');
        }

        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
        confirmPasswordRef.current.value = '';
    };

    return (
        <section className={classes.signup}>
            <h4>SignUp</h4>
            <form onSubmit={submitHandler}>
                <input type='email' placeholder="Email" ref={emailInputRef} required />
                <input type='password' placeholder="Password" ref={passwordInputRef} required />
                <input type='password' placeholder="Confirm Password" ref={confirmPasswordRef} required />
                {error && <p className={classes.error}>{error}</p>}
                <Button variant='dark' type='submit' size='md'>Sign up</Button>
            </form>
        </section>
    );
};

export default SignUp;
