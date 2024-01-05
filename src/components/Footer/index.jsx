import { useTheme } from '../../hooks/useTheme';

const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className={`${isDark ? 'footer' : ''}`}>
        <p>&copy; {currentYear} Techstack Media</p>
        <p>
          Made with{' '}
          <img
            style={{ marginBottom: '-3px' }}
            src='https://techstackmedia.com/images/love.svg'
            width={18}
            alt='red love heart'
          />{' '}
          by{' '}
          <a
            href='https://bello.bio.link/'
            target='_blank'
            rel='noopener noreferrer'
            className={isDark ? 'dark-a' : ''}
          >
            Bello Osagie Noah
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
