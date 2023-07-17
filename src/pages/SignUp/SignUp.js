import { Button } from 'react-bootstrap';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import classes from './SignUp.module.css';
import { authActions } from '../../components/Layout/store/auth-slice';

const SignUp = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordRef = useRef();
    const history = useHistory();
    const dispatch = useDispatch();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState)
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        let url;
        if (!isLogin) {
            const enteredConfirmPassword = confirmPasswordRef.current.value;
            if (enteredPassword !== enteredConfirmPassword) {
                setError('Passwords do not match');
                return;
            }
        }

        // not working beacuse of the type in input of the email "type="email"".
        if (!enteredEmail.includes('@')) {
            setError('Invalid email format');
            return;
        }

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzI3X4meYRgtEVaHG61zbqlBwcbPScHQo'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDzI3X4meYRgtEVaHG61zbqlBwcbPScHQo'
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const data = await response.json();
                let email = data.email.replace('@', '').replace('.', '');
                localStorage.setItem('email', email);
                localStorage.setItem('token', data.idToken);
                console.log(data);
                history.replace('/welcome');
                dispatch(authActions.login({token: data.idToken, email: email}));
                isLogin ? console.log("User has successfully Sign In.") : console.log("User has successfully signed up.");
            } else {
                setError('Something went wrong. Please try again later.');
            }
        } catch (error) {
            setError('Something went wrong. Please try again later.');
        }
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
        if (!isLogin) {
            confirmPasswordRef.current.value = '';
        }
    }

    return (
        <section className={classes.signup}>
            <h4>{isLogin ? 'Login' : 'SignUp'}</h4>
            <form onSubmit={submitHandler}>
                <input type='email' placeholder="Email" ref={emailInputRef} required />
                <input type='password' placeholder="Enter password" ref={passwordInputRef} required />
                {!isLogin && <input type='password' placeholder="confirm password" ref={confirmPasswordRef} required />}
                {error && <p className={classes.error}>{error}</p>}
                <Button variant='dark' type='submit' size='md'>{isLogin ? 'Login' : 'Sign up'}</Button>
            </form>
            <h6
                className={classes.toggle}
                onClick={switchAuthModeHandler}
            >
                {isLogin ? 'Create new account' : 'Already have an account? Login.'}
            </h6>
        </section>
    )
}

export default SignUp;