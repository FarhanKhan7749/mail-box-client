import { Navbar, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { authActions } from "./store/auth-slice";
import classes from "./Header.module.css"; 

const Header = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.auth.isAuthenticated);

    const logoutHandler = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        dispatch(authActions.logout());
        history.replace('/auth');
    }

    const composeMailHandler = () => {
        history.replace('/mail');
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand >Mail-Box-Client</Navbar.Brand>
                {isLogin && <ul className={classes.navbar}>
                    <li className={classes.li}><Link to="/inbox">Inbox</Link></li>
                    <li className={classes.li}><Link to="/sent">Sent</Link></li>
                </ul>}
                {isLogin && <Button size="sm" onClick={composeMailHandler}>Compose</Button>}
            </Container>
            {isLogin && <Button
                variant="warning"
                size="sm"
                style={{ marginRight: '35px' }}
                onClick={logoutHandler}
            >
                Logout
            </Button>}
        </Navbar>
    )
}

export default Header;
