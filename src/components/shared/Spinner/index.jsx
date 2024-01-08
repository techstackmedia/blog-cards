import { useTheme } from '../../../hooks/useTheme';
import './styles.css';

const Spinner = () => {
  const { isDark } = useTheme();

  return (
    <div className='blogs-status spinner'>
      <div
        className={`loading-spinner ${isDark ? 'dark-loading-spinner' : ''}`}
      ></div>
    </div>
  );
};

export default Spinner;
