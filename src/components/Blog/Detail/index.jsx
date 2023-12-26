import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './styles.css';
import BlogDetailContext from '../../../context/BlogDetailContext';

const BlogDetail = () => {
  const { renderHTML, getRestaurantsPost } = useContext(BlogDetailContext);
  console.log(renderHTML());

  const { id } = useParams();
  useEffect(() => {
    void getRestaurantsPost(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return renderHTML().__html === null ? null : (
    <div className='blog-detail'>
      <p>
        <Link to='/'>&lt; Back</Link>
      </p>
      <div dangerouslySetInnerHTML={renderHTML()} />
    </div>
  );
};

export default BlogDetail;
