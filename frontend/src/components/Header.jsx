import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice.jsx';
import { useDispatch } from 'react-redux';
import useAuth from '../hooks/index.jsx';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  
  const handleLogout = () => {
    // Очистка токена / состояния
    auth.logOut();
    // localStorage.removeItem('user');
    dispatch(logout());
    navigate('/');
  };

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hexlet Chat
        </Navbar.Brand>
        {auth.loggedIn && (
          <Nav className="ms-auto">
            <Button variant="primary" onClick={handleLogout}>
              Выйти
            </Button>
          </Nav>
        )}
       
      </Container>
    </Navbar>
  );
};
