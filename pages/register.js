import { Card, Form, Alert, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import { registerUser } from '../lib/authenticate';
import { useRouter } from 'next/router';

export default function Register() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [warning, setWarning] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registerUser(user, password, password2);
      router.push('/login');
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <Container>
      <Card bg="light" className="mb-4">
        <Card.Body>
          <h2>Register</h2>Register for an account:
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
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
        </Form.Group>
        {warning && <Alert variant="danger">{warning}</Alert>}
        <Button variant="primary" type="submit">Register</Button>
      </Form>
    </Container>
  );
}