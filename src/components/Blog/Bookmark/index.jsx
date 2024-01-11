import { useContext, useEffect, useState } from 'react';
import { BlogContext } from '../../../context/BlogContext';
import { useTheme } from '../../../hooks/useTheme';
import { dateFormatter } from '../../../utils/Formatter';
import { contentTruncate } from '../../../utils/Content';
import BlogContainer from '../Container';
import BlogPagination from '../Pagination/PrevNext';
import Subscription from '../Subscription';
import { BASE_URL } from '../../../constants/BASE_URL';
import Spinner from '../../shared/Spinner';

const BookMark = () => {
  const {
    prevPage,
    nextPage,
    pageCount,
    handleArticleNav,
    pageIndex,
  } = useContext(BlogContext);
  const { isDark } = useTheme();
  const [bookMark, setBookMark] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const storedEmail = localStorage.getItem('email');

  useEffect(() => {
    void getAllBookmark();
  }, []);

  const getAllBookmark = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/bookmarks`, {
        method: 'GET',
        'Content-Type': 'application/json',
      });
      if (!response.ok) {
        throw new Error('Error in getting all bookmarked items!');
      } else {
        const json = await response.json()
        setBookMark(json);
      }
    } catch (e) {
      setError(e.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className={`blog-title ${isDark ? 'dark-blog-title' : ''}`}>
        Bookmarked Blog Posts
      </h1>
      <div className='blogs'>
        <div className='blog-container'>
          {bookMark?.data.map((item) => {
            const cardTitle = item.attributes.Name;
            const dateString = item.attributes.publishedAt;
            const formattedDate = dateFormatter(dateString);

            const descriptions = item.attributes.Description;
            const { truncatedWords, content } = contentTruncate(descriptions);

            return (
              <BlogContainer
                key={item.id}
                handleArticleNav={handleArticleNav}
                item={item}
                cardTitle={cardTitle}
                cardDescription={content}
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
      {!storedEmail ? (
        <>
          <hr style={{ width: '90%' }} className={`${isDark} ? 'hr' : ''`} />
          <Subscription />
        </>
      ) : null}
    </>
  );
};

export default BookMark;
