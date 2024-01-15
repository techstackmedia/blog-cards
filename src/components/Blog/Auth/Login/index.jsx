import { useContext } from 'react';
import { BlogContext } from '../../../../context/BlogContext';
import '../styles.css';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../../hooks/useTheme';

const Login = () => {
  const {
    isLoginLoading,
    errorLogin,
    formLoginData,
    handleLoginChange,
    handleLoginSubmit,
    inputLoginPasswordError,
    inputLoginEmailUsenameError,
  } = useContext(BlogContext);
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
              : 'none',
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
              : 'none',
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
        <p style={{ color: isDark ? 'var(--color-white)' : 'var(--color-black)' }}>
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

        <button className='formInput' type='submit' style={{marginTop: 10}}>
          {isLoginLoading ? 'Loading' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default Login;
