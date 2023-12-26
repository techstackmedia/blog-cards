import BlogPagination from '../Pagination/PrevNext';
import './styles.css';
import BlogContainer from '../Container';
import { useContext } from 'react';
import BlogContext from '../../../context/BlogContext';

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
            const dateObject = new Date(dateString);
            const formattedDate = dateObject.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            const descriptions = item.attributes.Description;

            const textArray = descriptions
              .map((paragraph) => {
                return paragraph.children.map((child) => child.text);
              })
              .join(' ')
              .split(' ');
            const truncatedWords =
              textArray.length > 30
                ? `${textArray.splice(0, 30).join(' ')}...`
                : `${textArray.join(' ')}`;

            const content = textArray.join(' ');

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
