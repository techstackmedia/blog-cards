import { useTheme } from '../../../hooks/useTheme';
import './styles.css';

const Spinner = () => {
  const { isLight } = useTheme();

  return (
    <div className='blogs-status spinner'>
      <div
        className={`loading-spinner ${isLight ? 'dark-loading-spinner' : ''}`}
      ></div>
    </div>
  );
};

export default Spinner;
