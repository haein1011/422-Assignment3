/*
*
* WEB422-Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Haein Lee
* Student ID: 182583237
* Date: 2026-08-09
*/

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import PageHeader from '../components/PageHeader';

export default function Home() {
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  function onSubmit(data) {
    const filteredQuery = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== '')
    );

    router.push({
      pathname: '/books',
      query: filteredQuery
    });
  }

  return (
    <Container>
      <PageHeader 
        text="Book Search Engine" 
        subtext="Find your next favourite read using the Open Library API." 
      />

      <Form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white rounded shadow-sm">
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group controlId="author">
              <Form.Label>Author (Required)</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. J.K. Rowling"
                className={errors.author ? 'is-invalid' : ''}
                {...register('author', { required: true })}
              />
              {errors.author && (
                <div className="invalid-feedback">Author name is required to start a search.</div>
              )}
            </Form.Group>
          </Col>

          <Col md={6} className="mb-3">
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="e.g. Harry Potter" {...register('title')} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4} className="mb-3">
            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" placeholder="e.g. Fantasy" {...register('subject')} />
            </Form.Group>
          </Col>

          <Col md={4} className="mb-3">
            <Form.Group controlId="language">
              <Form.Label>Language</Form.Label>
              <Form.Control type="text" placeholder="e.g. eng" {...register('language')} />
            </Form.Group>
          </Col>

          <Col md={4} className="mb-3">
            <Form.Group controlId="first_publish_year">
              <Form.Label>First Publish Year</Form.Label>
              <Form.Control type="text" placeholder="e.g. 1997" {...register('first_publish_year')} />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="mt-2 px-4">
          Search Books
        </Button>
      </Form>
    </Container>
  );
}