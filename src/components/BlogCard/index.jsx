import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function BlogCard() {
  const [restaurants, setRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchParams = new URLSearchParams(window.location.search);
  const initialPageIndex = parseInt(searchParams.get('page')) || 1;

  const [pageIndex, setPageIndex] = useState(initialPageIndex);

  useEffect(() => {
    void getAllRestaurants();
    // eslint-disable-next-line no-use-before-define
  }, [pageIndex]);

  const navigate = useNavigate()

  const prevPage = () => {
    setPageIndex((prev) => {
      return prev - 1;
    });
    navigate(`?page=${pageIndex - 1}`)
  };

  const nextPage = () => {
    setPageIndex((prev) => {
      return prev + 1;
    });
    navigate(`?page=${pageIndex + 1}`)
  };

  const getAllRestaurants = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/restaurants?pagination[page]=${pageIndex}&pagination[pageSize]=9`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Error in fetching all restaurants');
      }
      const json = await response.json();
      setRestaurants(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className='blog-title'>Blog Posts</h1>
      <div className='blog-container'>
        {restaurants?.data.map((item) => {
          const cardTitle = item.attributes.Name;
          const cardDescription =
            item.attributes.Description[0].children[0].text;
          const words = cardDescription.split(' ');

          return (
            <div key={item.id} className='blog-card'>
              <div className='blog-card-image'>
                <p className='blog-card-title'>{cardTitle}</p>
              </div>
              <div className='blog-card-content'>
                <h2 className='blog-card-title'>{cardTitle}</h2>
                <p className='blog-card-description'>
                  {words.length > 20
                    ? `${words.splice(0, 20).join(' ')}...`
                    : cardDescription}
                </p>
              </div>
              <Link to={`/${item.id}`} className='blog-card-link'>
                Read More
              </Link>
            </div>
          );
        })}
      </div>
      <div className='blog-pagination'>
        <button disabled={pageIndex === 1} onClick={prevPage}>
          &lt; Previous
        </button>
        {`${pageIndex} / ${restaurants?.meta?.pagination.pageCount}`}
        <button
          disabled={pageIndex === restaurants?.meta?.pagination.pageCount}
          onClick={nextPage}
        >
          Next &gt;
        </button>
      </div>
    </>
  );
}

export default BlogCard;
