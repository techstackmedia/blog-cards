import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BlogAuthContext } from '../BlogAuthContext';
import { BASE_URL } from '../../constants/BASE_URL';
import { defaultBlogBookmarkValue } from '../defaultValues';

const BlogBookmarkContext = createContext(defaultBlogBookmarkValue);
const BlogBookmarkProvider = ({ children }) => {
  const [bookMark, setBookMark] = useState(null);
  const [errorDelete, setErrorDelete] = useState(null);
  const [errorBookmark, setErrorBookmark] = useState(null);
  const [successDelete, setSuccessDelete] = useState(null);
  const searchParams = new URLSearchParams(window.location.search);
  const initialPageIndex = parseInt(searchParams.get('page')) || 1;
  // const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isLoadingBookmark, setIsLoadingBookmark] = useState(false);
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const { authToken } = useContext(BlogAuthContext);
  const { pathname } = useLocation();
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

  const pageCount =
    pathname !== '/' ? bookMark?.meta?.pagination.pageCount : null;

  useEffect(() => {
    void getAllBookmark();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllBookmark = async () => {
    try {
      setIsLoadingBookmark(true);
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
      setErrorBookmark(e.message);
      setTimeout(() => {
        setErrorBookmark(null);
      }, 3000);
    } finally {
      setIsLoadingBookmark(false);
    }
  };

  const deleteBookmark = async (id) => {
    try {
      // setIsDeleteLoading(true)
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
    // finally {
    //   setIsDeleteLoading(false)
    // }
  };
  return (
    <BlogBookmarkContext.Provider
      value={{
        bookMark,
        errorDelete,
        successDelete,
        // isDeleteLoading,
        prevPage,
        nextPage,
        handleArticleNav,
        deleteBookmark,
        isLoadingBookmark,
        errorBookmark,
        pageCount,
        pageIndex,
      }}
    >
      {children}
    </BlogBookmarkContext.Provider>
  );
};

export { BlogBookmarkProvider, BlogBookmarkContext };
