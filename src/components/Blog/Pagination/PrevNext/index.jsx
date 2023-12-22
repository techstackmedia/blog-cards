import './styles.css'

const BlogPagination = ({ prevPage, nextPage, pageCount, pageIndex }) => {
    return (
      <div className='blog-prevNext-pagination'>
        <button disabled={pageIndex === 1} onClick={prevPage}>
          &lt; Previous
        </button>
        {`${pageIndex} / ${pageCount}`}
        <button disabled={pageIndex === pageCount} onClick={nextPage}>
          Next &gt;
        </button>
      </div>
    );
  };
  
  export default BlogPagination;
  