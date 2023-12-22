import { useEffect, useState } from 'react';
import './styles.css'

const BlogPagination = ({
  pageIndex,
  currentPage,
  pageCount,
  nextPage,
  prevPage,
  total,
}) => {
  const [arr, setArr] = useState([]);
  const [activeButton, setActiveButton] = useState(1);

  const generatePageArray = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const updatePageArray = (newPage) => {
    if (pageCount <= 4) {
      setArr(generatePageArray(1, pageCount));
    } else if (newPage <= 4) {
      setArr([...generatePageArray(1, 5), '...', total]);
    } else if (newPage >= total - 3) {
      setArr([1, '...', total - 4, total - 3, total - 2, total - 1, total]);
    } else {
      setArr([1, '...', newPage - 1, newPage, newPage + 1, '...', total]);
    }
  };

  const handlePageClick = (event) => {
    const value = event.target.textContent;

    if (value === '<') {
      const newActiveButton = Math.max(activeButton - 1, 1);
      setActiveButton(newActiveButton);
      updatePageArray(newActiveButton);
      prevPage();
    } else if (value === '>') {
      const newActiveButton = Math.min(activeButton + 1, total);
      setActiveButton(newActiveButton);
      updatePageArray(newActiveButton);
      nextPage();
    } else {
      const newPage = parseInt(value, 10);
      setActiveButton(newPage);
      updatePageArray(newPage);
      currentPage(newPage);
    }
  };

  useEffect(() => {
    updatePageArray(activeButton);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='blog-numbered-pagination'>
      <div className='blog-buttons-pagination'>
        <button
          className='blog-button-icon'
          onClick={(e) => handlePageClick(e)}
        >
          &lt;
        </button>
        {arr.map((item, index) => {
          return (
            <button
              key={`${item}-${index}`}
              className={`blog-button-icon ${
                parseInt(item, 10) === pageIndex
              ? 'blog-active-button' : ''}`}
              onClick={(e) => handlePageClick(e)}
            >
              {item}
            </button>
          );
        })}
        <button
          className='blog-button-icon'
          onClick={(e) => handlePageClick(e)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default BlogPagination;
