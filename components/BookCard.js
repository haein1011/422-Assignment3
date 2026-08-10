import useSWR from 'swr';
import Error from 'next/error';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function BookCard(props) {
  const { workId } = props;

  const { data, error } = useSWR(`https://openlibrary.org/works/${workId}.json`);

  if (error) return <Error statusCode={404} />;
  if (!data) return null; 

  const coverUrl = data.covers && data.covers.length > 0 
    ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg` 
    : 'https://placehold.co/150x220?text=No+Image';

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Img variant="top" src={coverUrl} alt={data.title} style={{ height: '250px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="fw-bold fs-5 mb-2">{data.title || "Untitled"}</Card.Title>
          <Card.Text className="text-muted small">Pub: {data.first_publish_date || "N/A"}</Card.Text>
        </div>
        <Link href={`/works/${workId}`} className="btn btn-outline-dark btn-sm mt-3 w-100">
            View Details
        </Link>
      </Card.Body>
    </Card>
  );
}