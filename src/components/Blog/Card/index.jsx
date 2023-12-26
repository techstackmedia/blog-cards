import BlogPagination from '../Pagination/PrevNext';
import './styles.css';
import BlogContainer from '../Container';
import { useContext } from 'react';
import { contentTruncate } from '../../../utils/Content';
import { dateFormatter } from '../../../utils/Formatter';
import { BlogContext } from '../../../context/BlogContext';

function BlogCard() {
  const {
    prevPage,
    nextPage,
    pageCount,
    handleArticleNav,
    restaurants,
    pageIndex,
  } = useContext(BlogContext);

  return (
    <>
      <h1 className='blog-title'>Blog Posts</h1>
      <div className='blogs'>
        <div className='blog-container'>
          {restaurants?.data.map((item) => {
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
    </>
  );
}

export default BlogCard;
