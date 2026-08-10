import { Card } from 'react-bootstrap';

export default function PageHeader(props) {
  return (
    <Card className="bg-light mb-4 border-0 shadow-sm">
      <Card.Body className="p-4">
        <h2 className="fw-bold text-primary">{props.text}</h2>
        {props.subtext && (
          <p className="text-muted mb-0 mt-2">
            {props.subtext}
          </p>
        )}
      </Card.Body>
    </Card>
  );
}