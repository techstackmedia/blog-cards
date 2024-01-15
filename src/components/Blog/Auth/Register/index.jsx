import { useContext } from 'react';
import { BlogContext } from '../../../../context/BlogContext';
import '../styles.css';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../../hooks/useTheme';

const Register = () => {
  const {
    isRegisterLoading,
    errorRegister,
    formRegisterData,
    handleRegisterChange,
    handleRegisterSubmit,
    inputRegisterPasswordError,
    inputRegisterEmailUsenameError,
  } = useContext(BlogContext);
  const { isDark } = useTheme();

  return (
    <form onSubmit={handleRegisterSubmit} className='form'>
      <div>
        <input
          className='formInput'
          type='text'
          placeholder='Your Username'
          name='username'
          value={formRegisterData.username}
          onChange={handleRegisterChange}
          autoComplete='off'
          required
          style={{
            border: inputRegisterEmailUsenameError
              ? '1px solid var(--dark-background-error)'
              : 'none',
          }}
        />
      </div>
      <div>
        <input
          className='formInput'
          type='email'
          placeholder='Your Email'
          name='email'
          value={formRegisterData.email}
          onChange={handleRegisterChange}
          autoComplete='off'
          required
          style={{
            border: inputRegisterEmailUsenameError
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
          value={formRegisterData.password}
          onChange={handleRegisterChange}
          autoComplete='off'
          required
          style={{
            border: inputRegisterPasswordError
              ? '1px solid var(--dark-background-error)'
              : 'none',
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
          Already have an account? <Link to='/auth/login' style={{color: isDark ? 'var(--dark-color-link)' : 'var(--color-link)'}}>Login</Link>
        </p>
        <button className='formInput' type='submit' style={{marginTop: 10}}>
          {isRegisterLoading ? 'Loading' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default Register;
