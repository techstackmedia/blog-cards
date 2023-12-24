import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogPagination from '../Pagination/PrevNext';
import './styles.css';
import Spinner from '../../shared/Spinner';
import BlogContainer from '../Container';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  const navigate = useNavigate();

  const prevPage = () => {
    setPageIndex((prev) => {
      return prev - 1;
    });
    navigate(`?page=${pageIndex - 1}`);
  };

  const nextPage = () => {
    setPageIndex((prev) => {
      return prev + 1;
    });
    navigate(`?page=${pageIndex + 1}`);
  };

  const handleArticleNav = (link) => {
    navigate(link);
  };

  const pageCount = restaurants?.meta?.pagination.pageCount;

  const getAllRestaurants = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/restaurants?pagination[page]=${pageIndex}&pagination[pageSize]=12`,
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
    return <p className='blogs-status'>{error}</p>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!restaurants?.data || restaurants?.data.length === 0) {
    return <p className='blogs-status'>No blog posts found</p>;
  }

  return (
    <>
      <h1 className='blog-title'>Blog Posts</h1>
      <div className='blogs'>
        <div className='blog-container'>
          {restaurants?.data.map((item) => {
            const cardTitle = item.attributes.Name;
            const cardDescription =
              item.attributes.Description[0].children[0].text;
            const words = cardDescription.split(' ');
            const dateString = item.attributes.publishedAt;
            const dateObject = new Date(dateString);
            const formattedDate = dateObject.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            const truncatedWords =
              words.length > 30
                ? `${words.splice(0, 30).join(' ')}...`
                : cardDescription;

            return (
              <BlogContainer
                key={item.id}
                handleArticleNav={handleArticleNav}
                item={item}
                cardTitle={cardTitle}
                cardDescription={cardDescription}
                formattedDate={formattedDate}
                truncatedWords={truncatedWords}
              />
            );
          })}
        </div>
      </div>
      <BlogPagination
        pageIndex={pageIndex}
        prevPage={prevPage}
        nextPage={nextPage}
        pageCount={pageCount}
      />
    </>
  );
}

export default BlogCard;
