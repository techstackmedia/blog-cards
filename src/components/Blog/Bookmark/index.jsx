import { useContext } from 'react';
import { BlogContext } from '../../../context/BlogContext';
import { useTheme } from '../../../hooks/useTheme';
import { dateFormatter } from '../../../utils/Formatter';
import { contentTruncate } from '../../../utils/Content';
import BlogContainer from '../Container';
import BlogPagination from '../Pagination/PrevNext';
import Subscription from '../Subscription';
import Spinner from '../../shared/Spinner';
import Footer from '../../Footer';
import Navbar from '../../Navbar';

const BookMark = () => {
  const {
    prevPage,
    nextPage,
    pageCount,
    handleArticleNav,
    pageIndex,
    bookMark,
    errorDelete,
    successDelete,
    isDeleteLoading,
  } = useContext(BlogContext);
  const { isDark } = useTheme();

  const storedEmail = localStorage.getItem('email');

  return (
    <>
      <Navbar />
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
        {isDeleteLoading ? (
          <Spinner />
        ) : errorDelete ? (
          errorDelete
        ) : successDelete ? (
          successDelete
        ) : null}
      </div>
      <BlogPagination
        pageIndex={pageIndex}
        prevPage={prevPage}
        nextPage={nextPage}
        pageCount={pageCount}
      />
      {!storedEmail ? (
        <>
          <Navbar />
          <hr style={{ width: '90%' }} className={`${isDark} ? 'hr' : ''`} />
          <Subscription />
          <Footer />
        </>
      ) : null}
    </>
  );
};

export default BookMark;
