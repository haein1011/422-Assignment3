import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { readToken, removeToken } from '../lib/authenticate';

export default function MainNav() {
  const router = useRouter();
  const token = readToken();

  function logout() {
    removeToken();
    router.push('/login');
  }

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} href="/">
          OpenLibrary Searcher
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link>Home</Nav.Link>
            </Link>
          </Nav>
          
          {token ? (
            <Nav>
              <NavDropdown title={token.userName} id="user-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item>Favourites</NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Link href="/register" passHref legacyBehavior>
                <Nav.Link>Register</Nav.Link>
              </Link>
              <Link href="/login" passHref legacyBehavior>
                <Nav.Link>Login</Nav.Link>
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}