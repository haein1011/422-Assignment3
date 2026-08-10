import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState } from 'react';
import { Container, Table, Pagination } from 'react-bootstrap';
import Link from 'next/link';
import PageHeader from '../components/PageHeader';

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Books() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  let queryString = { ...router.query };
  let qParts = [];

  Object.entries(queryString).forEach(([key, value]) => {
    qParts.push(`${key}:${value}`);
  });

  if (qParts.length > 0) {
    queryString = qParts.join(' AND ');
  } else {
    queryString = '';
  }

const { data, error } = useSWR(
  queryString ? `https://openlibrary.org/search.json?q=${queryString}&page=${page}&limit=10&fields=key,title,first_publish_year` : null, // 👈 encodeURIComponent 제거
  fetcher,
  { keepPreviousData: true }
);

  const searchCriteria = Object.keys(router.query).map(key => `${key}: ${router.query[key]}`).join(', ');

  if (error) return <Container className="mt-4"><p>Error loading books data.</p></Container>;
  if (!data) return <Container className="mt-4"><p>Loading search results...</p></Container>;

  return (
    <Container>
      <PageHeader text="Search Results" subtext={searchCriteria ? `Filtered by: ${searchCriteria}` : "All matches"} />

      <Table striped bordered hover responsive className="bg-white rounded shadow-sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>First Published</th>
            <th>Key (ID)</th>
          </tr>
        </thead>
        <tbody>
          {data.docs && data.docs.map((book) => (
            <tr key={book.key}>
              <td>
                <Link href={`/works/${book.key.replace('/works/', '')}`} passHref legacyBehavior>
                  {book.title}
                </Link>
              </td>
              <td>{book.first_publish_year || 'N/A'}</td>
              <td>{book.key}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1} />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next onClick={() => setPage(prev => prev + 1)} />
      </Pagination>
    </Container>
  );
}