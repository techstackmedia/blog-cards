import { useTheme } from '../../../../hooks/useTheme';
import './styles.css';

const BlogPagination = ({ prevPage, nextPage, pageCount, pageIndex }) => {
  const { isDark } = useTheme();
  return (
    <div className='blog-prevNext-pagination'>
      <button
        disabled={pageIndex === 1}
        onClick={prevPage}
        className={`${isDark ? 'button' : 'default'}`}
      >
        &lt; Previous
      </button>
      {`${pageIndex} / ${pageCount}`}
      <button
        disabled={pageIndex === pageCount}
        onClick={nextPage}
        className={`${isDark ? 'button' : 'default'}`}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default BlogPagination;
