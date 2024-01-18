import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../components/shared/Spinner';
import { defaultBlogValue } from '../defaultValues';
import { BASE_URL } from '../../constants/BASE_URL';
import { useTheme } from '../../hooks/useTheme';
import { BlogAuthContext } from '../BlogAuthContext';

const BlogContext = createContext(defaultBlogValue);

const BlogProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [restaurants, setRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isDark } = useTheme();
  const [bookMark, setBookMark] = useState(null);
  const [errorDelete, setErrorDelete] = useState(null);
  const [successDelete, setSuccessDelete] = useState(null);
  const searchParams = new URLSearchParams(window.location.search);
  const initialPageIndex = parseInt(searchParams.get('page')) || 1;
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const { authToken } = useContext(BlogAuthContext);
  
  useEffect(() => {
    void getAllRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  const navigate = useNavigate();

  useEffect(() => {
    void getAllBookmark();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllBookmark = async () => {
    try {
      setIsDeleteLoading(true);
      const response = await fetch(
        `${BASE_URL}/bookmarks?pagination[page]=${pageIndex}&pagination[pageSize]=12`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Error in getting all bookmarked items!');
      } else {
        const json = await response.json();
        setBookMark(json);
      }
    } catch (e) {
      setErrorDelete(e.message);
      setTimeout(() => {
        setErrorDelete(null);
      }, 3000);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const deleteBookmark = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/bookmarks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error in deleting item.');
      } else {
        setBookMark((prevBookMark) => ({
          ...prevBookMark,
          data: prevBookMark.data.filter((item) => item.id !== id),
        }));
        setSuccessDelete('Item successfully deleted!');
        setTimeout(() => {
          setSuccessDelete('');
        }, 3000);
      }
    } catch (e) {
      setErrorDelete(e.message);
      setTimeout(() => {
        setErrorDelete('');
      }, 3000);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Spinner />;
  }

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

  const pageCount =
    pathname !== '/'
      ? bookMark?.meta?.pagination.pageCount
      : restaurants?.meta?.pagination.pageCount;

  const getAllRestaurants = async () => {
    try {
      setIsLoading(true);
      setError(null);
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
    return (
      <div
        style={{
          position: 'fixed',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          width: '100%',
          height: '100%',
          background: isDark ? '' : '#fff',
        }}
      >
        <Spinner />
      </div>
    );
  }

  if (!restaurants?.data || restaurants?.data.length === 0) {
    return <p className='blogs-status'>No blog posts found</p>;
  }
  return (
    <BlogContext.Provider
      value={{
        prevPage,
        nextPage,
        bookMark,
        errorDelete,
        successDelete,
        isDeleteLoading,
        authToken,
        pageCount,
        deleteBookmark,
        handleArticleNav,
        restaurants,
        pageIndex,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export { BlogProvider, BlogContext };
