import { Card, Form, Alert, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import { authenticateUser } from '../lib/authenticate';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { getFavourites } from '../lib/userData';

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const router = useRouter();

  async function updateAtom() {
    setFavouritesList(await getFavourites());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      await updateAtom();
      router.push('/');
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <Container>
      <Card bg="light" className="mb-4">
        <Card.Body>
          <h2>Login</h2>Enter your login information below:
        </Card.Body>
      </Card>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>User:</Form.Label>
          <Form.Control type="text" value={user} onChange={(e) => setUser(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        {warning && <Alert variant="danger">{warning}</Alert>}
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </Container>
  );
}