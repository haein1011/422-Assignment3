import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { favouritesAtom } from '../store';
import { addToFavourites, removeFromFavourites } from '../lib/userData';

export default function BookDetails(props) {
  const { book, workId, showFavouriteBtn = true } = props;
  
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(workId));
  }, [favouritesList, workId]);

  async function favouritesClicked() {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(workId));
    } else {
      setFavouritesList(await addToFavourites(workId));
    }
  }

  const coverUrl = book.covers && book.covers.length > 0 
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg` 
    : 'https://placehold.co/400x600?text=No+Cover+Available';

  return (
    <Row className="p-4 bg-white rounded shadow-sm">
      <Col lg={4} className="mb-4 text-center">
        <Card.Img
          src={coverUrl}
          alt={book.title}
          className="img-fluid rounded shadow-sm"
          style={{ maxWidth: '300px' }}
        />
      </Col>
      <Col lg={8}>
        <h2 className="mb-3 fw-bold">{book.title || "Unknown Title"}</h2>
        <p><strong>Description:</strong> {typeof book.description === 'object' ? book.description.value : book.description || "No description provided."}</p>
        <p><strong>First Published:</strong> {book.first_publish_date || "N/A"}</p>
        
        {showFavouriteBtn && (
          <Button 
            variant={showAdded ? "primary" : "outline-primary"} 
            onClick={favouritesClicked}
            className="mt-3 px-4"
          >
            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
          </Button>
        )}
      </Col>
    </Row>
  );
}