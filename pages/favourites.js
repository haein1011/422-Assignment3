import { useAtom } from 'jotai';
import { Container, Row, Col } from 'react-bootstrap';
import { favouritesAtom } from '../store';
import PageHeader from '../components/PageHeader';
import BookCard from '../components/BookCard';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  if (favouritesList.length === 0) {
    return (
      <Container>
        <PageHeader text="Nothing Here" subtext="Your collection is empty. Go find some awesome books!" />
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader text="Your Favourites" subtext="A tailored collection of your handpicked reads." />
      
      <Row className="gy-4">
        {favouritesList.map((id) => (
          <Col lg={3} md={6} key={id}>
            <BookCard workId={id} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}