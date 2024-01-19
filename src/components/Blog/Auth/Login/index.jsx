import { useContext } from 'react';
import '../styles.css';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../../hooks/useTheme';
import { BlogAuthContext } from '../../../../context/BlogAuthContext';
import Button from '../../Button';

const Login = () => {
  const {
    isLoginLoading,
    errorLogin,
    formLoginData,
    handleLoginChange,
    handleLoginSubmit,
    inputLoginPasswordError,
    inputLoginEmailUsenameError,
  } = useContext(BlogAuthContext);
  const { isDark } = useTheme();

  return (
    <form onSubmit={handleLoginSubmit} className='form'>
      <div>
        <input
          className='formInput'
          type='text'
          placeholder='Your Username or Email'
          name='identifier'
          value={formLoginData?.identifier}
          onChange={handleLoginChange}
          autoComplete='off'
          required
          style={{
            border: inputLoginEmailUsenameError
              ? '1px solid var(--dark-background-error)'
              : isDark
              ? '1px solid var(--color-white)'
              : '1px solid var(--color-button-disable)',
          }}
        />
      </div>
      <div>
        <input
          className='formInput'
          type='password'
          placeholder='Your Password'
          name='password'
          value={formLoginData?.password}
          onChange={handleLoginChange}
          autoComplete='off'
          required
          style={{
            border: inputLoginPasswordError
              ? '1px solid var(--dark-background-error)'
              : isDark
              ? '1px solid var(--color-white)'
              : '1px solid var(--color-button-disable)',
          }}
        />
      </div>
      <div className='errorForm'>
        {inputLoginEmailUsenameError || inputLoginPasswordError ? (
          <div>
            <p className='error_auth'>{inputLoginEmailUsenameError}</p>
            <p className='error_auth'>{inputLoginPasswordError}</p>
          </div>
        ) : (
          <p>{errorLogin}</p>
        )}
        <p
          style={{
            color: isDark ? 'var(--color-white)' : 'var(--color-black)',
          }}
        >
          Don't have an account?{' '}
          <Link
            to='/auth/register'
            style={{
              color: isDark ? 'var(--dark-color-link)' : 'var(--color-link)',
            }}
          >
            Register
          </Link>
        </p>
        <Button
          isDisabled={isLoginLoading ? true : false}
          className={`formInput ${isDark ? 'dark-button' : 'button'}`}
          sx={{
            marginTop: 10,
            backgroundColor: !isDark ? 'var(--background-color)' : '',
          }}
        >
          {isLoginLoading ? 'Loading' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default Login;
