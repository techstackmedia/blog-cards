import { useContext } from 'react';
import { BlogContext } from '../../../context/BlogContext';
import { useTheme } from '../../../hooks/useTheme';
import { dateFormatter } from '../../../utils/Formatter';
import { contentTruncate } from '../../../utils/Content';
import BlogContainer from '../Container';
import BlogPagination from '../Pagination/PrevNext';
import Subscription from '../Subscription';
import Spinner from '../../shared/Spinner';

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
          <div
            style={{
              backgroundColor: 'var(--background-error)',
              color: 'var(--color-white)',
              width: 250,
              marginInline: 'auto',
              border: '1px solid var(--color-white)',
              outline: '1px solid var(--background-error)',
              borderRadius: 4,
              textAlign: 'center',
              paddingBlock: 20,
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {errorDelete}
          </div>
        ) : successDelete ? (
          <div
            style={{
              backgroundColor: 'var(--background-success)',
              color: 'var(--color-white)',
              width: 250,
              marginInline: 'auto',
              border: '1px solid var(--color-white)',
              outline: '1px solid var(--background-success)',
              borderRadius: 4,
              textAlign: 'center',
              paddingBlock: 20,
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {successDelete}
          </div>
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
          <hr style={{ width: '90%' }} className={`${isDark} ? 'hr' : ''`} />
          <Subscription />
        </>
      ) : null}
    </>
  );
};

export default BookMark;
