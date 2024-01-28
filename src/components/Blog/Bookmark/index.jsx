import { useContext } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { dateFormatter } from '../../../utils/Formatter';
import { contentTruncate } from '../../../utils/Content';
import BlogContainer from '../Container';
import BlogPagination from '../Pagination/PrevNext';
import Subscription from '../Subscription';
import Spinner from '../../shared/Spinner';
import { BlogBookmarkContext } from '../../../context/BlogBookmarkContext';

const BookMark = () => {
  const {
    prevPage,
    nextPage,
    pageCount,
    handleArticleNav,
    pageIndex,
    errorBookmark,
    isLoadingBookmark,
    bookMark,
    errorDelete,
    successDelete,
    isDeleteLoading,
  } = useContext(BlogBookmarkContext);
  const { isDark } = useTheme();

  const storedEmail = localStorage.getItem('email');

  if (errorBookmark) {
    return <p>Failed to bookmark post. Try again!</p>
  }

  if (isLoadingBookmark) {
    return <Spinner />
  }

  return (
    <>
      <h1 className={`blog-title ${isDark ? 'dark-blog-title' : ''}`}>
        Bookmarked Blog Posts
      </h1>
      {bookMark?.data.length === 0 ? (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'var(--color-white)',
            color: 'var(--color-black)',
            borderRadius: 4,
            paddingBlock: 20,
            width: 250,
            textAlign: 'center',
          }}
        >
          No more item bookmarked!
        </div>
      ) : (
        <div className='blogs'>
          <div className='blog-container'>
            {bookMark?.data.map((item) => {
              const identity = item.attributes.identity
              const cardTitle = item.attributes.Name;
              const dateString = item.attributes.publishedAt;
              const formattedDate = dateFormatter(dateString);

              const descriptions = item.attributes.Description;
              const { truncatedWords, content } = contentTruncate(descriptions);

              return (
                <BlogContainer
                  key={item.id}
                  identity={identity}
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
      )}
      {bookMark?.data.length === 0 ? null : (
        <BlogPagination
          pageIndex={pageIndex}
          prevPage={prevPage}
          nextPage={nextPage}
          pageCount={pageCount}
        />
      )}
      {!storedEmail ? (
        <>
          {bookMark?.data.length === 0 ? null : (
            <hr style={{ width: '90%' }} className={`${isDark} ? 'hr' : ''`} />
          )}
          <Subscription />
        </>
      ) : null}
    </>
  );
};

export default BookMark;
