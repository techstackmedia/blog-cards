import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/shared/Spinner';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const BlogContext = createContext();
const BlogProvider = ({ children }) => {
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

  const smoothScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const prevPage = () => {
    setPageIndex((prev) => {
      return prev - 1;
    });
    navigate(`?page=${pageIndex - 1}`);
    smoothScroll();
  };

  const nextPage = () => {
    setPageIndex((prev) => {
      return prev + 1;
    });
    navigate(`?page=${pageIndex + 1}`);
    smoothScroll();
  };

  const handleArticleNav = (link) => {
    navigate(link);
    smoothScroll();
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
    <BlogContext.Provider
      value={{
        prevPage,
        nextPage,
        pageCount,
        handleArticleNav,
        restaurants,
        pageIndex,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export { BlogProvider };
export default BlogContext;
