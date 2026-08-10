import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Container } from 'react-bootstrap';
import BookDetails from '../../components/BookDetails';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function WorkDetails() {
  const router = useRouter();
  const { workID } = router.query; 

  const { data, error } = useSWR(
    workID ? `https://openlibrary.org/works/${workID}.json` : null,
    fetcher
  );

  if (error) return <Container className="mt-4"><p>Failed to find book information.</p></Container>;
  if (!data) return <Container className="mt-4"><p>Fetching details...</p></Container>;

  return (
    <Container className="mt-4">
      <BookDetails book={data} workId={workID} />
    </Container>
  );
}