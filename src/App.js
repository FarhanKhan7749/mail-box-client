import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Layout/Header';
import SignUp from './pages/SignUp/SignUp';
import Welcome from './pages/Welcome/Welcome';

function App() {
  return (
    <Switch>
      <Route path='/' exact>
        <Redirect to='/auth' />
      </Route>
      <Route path='/auth'>
        <Header />
        <SignUp />
      </Route>
      <Route path='/welcome'>
        <Welcome />
      </Route>
      <Route path='*'>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
}

export default App;
