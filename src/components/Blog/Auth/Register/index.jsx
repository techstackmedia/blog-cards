import { useContext } from 'react';
import '../styles.css';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../../hooks/useTheme';
import { BlogAuthContext } from '../../../../context/BlogAuthContext';
import Button from '../../Button';

const Register = () => {
  const {
    isRegisterLoading,
    errorRegister,
    formRegisterData,
    handleRegisterChange,
    handleRegisterSubmit,
    inputRegisterPasswordError,
    inputRegisterEmailUsenameError,
  } = useContext(BlogAuthContext);
  const { isDark } = useTheme();

  return (
    <form onSubmit={handleRegisterSubmit} className='form'>
      <div>
        <input
          className='formInput'
          type='text'
          placeholder='Your Username'
          name='username'
          value={formRegisterData?.username}
          onChange={handleRegisterChange}
          autoComplete='off'
          required
          style={{
            border: inputRegisterEmailUsenameError
              ? '1px solid var(--dark-background-error)'
              : '1px solid var(--color-button-disable)',
          }}
        />
      </div>
      <div>
        <input
          className='formInput'
          type='email'
          placeholder='Your Email'
          name='email'
          value={formRegisterData?.email}
          onChange={handleRegisterChange}
          autoComplete='off'
          required
          style={{
            border: inputRegisterEmailUsenameError
              ? '1px solid var(--dark-background-error)'
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
          value={formRegisterData?.password}
          onChange={handleRegisterChange}
          autoComplete='off'
          required
          style={{
            border: inputRegisterPasswordError
              ? '1px solid var(--dark-background-error)'
              : '1px solid var(--color-button-disable)',
          }}
        />
      </div>
      <div className='errorForm'>
        {inputRegisterEmailUsenameError || inputRegisterPasswordError ? (
          <>
            <p>{inputRegisterEmailUsenameError}</p>
            <p>{inputRegisterPasswordError}</p>
          </>
        ) : (
          <p>{errorRegister}</p>
        )}
        <p style={{ color: isDark ? '#fff' : '#000' }}>
          Already have an account?{' '}
          <Link
            to='/auth/login'
            style={{
              color: isDark ? 'var(--dark-color-link)' : 'var(--color-link)',
            }}
          >
            Login
          </Link>
        </p>
        <Button
          isDisabled={isRegisterLoading ? true : false}
          className={`formInput ${isDark ? 'dark-button' : 'button'}`}
          sx={{
            marginTop: 10,
            backgroundColor: !isDark ? 'var(--background-color)' : '',
          }}
        >
          {isRegisterLoading ? 'Loading' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default Register;
